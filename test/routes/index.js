import '@config';
import db from '@server/db_connect';
import Server from '@server';
import request from 'supertest';
import Models from '@server/models';
import jwt from 'jsonwebtoken';
import { assert } from 'chai';

const { User, Notebook } = Models;

async function generateTestUsers() {
  return Promise.all([
    await User.create({
      username: 'test1',
      fbUserID: 'test1',
      email: 'test1@test.org'
    }),
    await User.create({
      username: 'test2',
      fbUserID: 'test2',
      email: 'test2@test.org'
    }),
    await User.create({
      username: 'test3',
      fbUserID: 'test3',
      email: 'test3@test.org'
    })
  ]);
}

function populateNotebooks(users) {
  const notebooks = [];
  users.forEach(async user => {
    const first = {
      title: 'first',
      owner: user._id
    };

    const second = {
      title: 'second',
      owner: user._id,
      isPrivate: true
    };

    const third = {
      title: 'third',
      owner: user._id,
      isShared: true
    };

    notebooks.push([
      await Notebook.create(first),
      await Notebook.create(second),
      await Notebook.create(third)
    ]);
  });

  return notebooks;
}

db.on('connected', function() {
  let testUsers = [];
  let testNotebooks = [];

  describe('API Routes', function() {
    before(async function() {
      testUsers = await generateTestUsers();
      testNotebooks = populateNotebooks(testUsers);
    });

    after(async function() {
      await db.dropDatabase();
      await db.close();
    });

    describe('Users', function() {
      describe('GET /users', function() {
        it('should return a list of users', function(done) {
          request(Server)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);

              assert.typeOf(body, 'array');
              assert.lengthOf(body, 3);

              const user = body[0];
              assert.isOk(user.uid);
              assert.isOk(user.id);
              assert.isOk(user.displayName);
              assert.match(user.displayName, /Hipsteracho/);
              assert.isOk(user.profileURL);
              assert.isOk(user.dateJoined);
              assert.isOk(user.dateLastLogin);
              assert.isOk(user.location);
              assert.isNotOk(user.email);
              assert.isNotOk(user.username);
              assert.isNotOk(user.token);
              assert.isNotOk(user.fbUserID);
              assert.isNotOk(user.fbUserAccess);

              done();
            });
        });

        it('should return an empty array if no users found', async function() {
          await db.dropDatabase();
          return request(Server)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async ({ body }) => {
              assert.ok(body);
              assert.typeOf(body, 'array');
              assert.lengthOf(body, 0);
              testUsers = await generateTestUsers();
              testNotebooks = populateNotebooks(testUsers);
            });
        });
      });

      describe('POST /user/fb', function() {
        it('should return 200 when successful', function(done) {
          const user = testUsers[0];
          const params = {
            id: user.id,
            userID: '123456',
            accessToken: '123456'
          };

          request(Server)
            .post('/api/user/fb')
            .send(params)
            .expect(200, done);
        });
        it('should return 400 when malformed arguments are provided', function(done) {
          const user = testUsers[0];
          const params = {
            ID: user.id,
            user: '123456',
            accessToken: '123456'
          };

          request(Server)
            .post('/api/user/fb')
            .send(params)
            .expect(400, done);
        });
        it('should return 400 when no arguments are provided', function(done) {
          request(Server)
            .post('/api/user/fb')
            .expect(400, done);
        });
        it('should return 404 when when matching ID not found', function(done) {
          const params = {
            id: 12345645,
            userID: '123456',
            accessToken: '123456'
          };

          request(Server)
            .post('/api/user/fb')
            .send(params)
            .expect(404, done);
        });
      });

      describe('POST /user/token', function() {
        it('should return a specified user based on the ID provided', function(done) {
          const user = testUsers[1];
          request(Server)
            .post('/api/user/token')
            .send({ id: user.id })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);
              const res = JSON.parse(JSON.stringify(body));

              assert.ok(res, "object doesn't exist");
              assert.typeOf(res, 'object', "response isn't an object");

              assert.equal(user.uid, res.uid, "uid doesn't match");
              assert.equal(user._id, res._id, '_id does not match');
              assert.equal(
                user.displayName,
                res.displayName,
                'displayName does not match'
              );

              assert.isOk(res.email, 'email not found');
              assert.isOk(res.fbUserID, 'facebook user id not found');
              assert.isOk(res.token, 'token not found');

              done();
            });
        });

        it('should 404 if invalid ID is provided', function(done) {
          request(Server)
            .post('/api/user/token')
            .send({ id: '12345678' })
            .expect(404, done);
        });

        it('should 400 if no ID is found', function(done) {
          request(Server)
            .post('/api/user/token')
            .expect(400, done);
        });
      });
    });

    describe('Notebooks', function() {
      describe('POST /notebook/create', function() {
        it('should return a newly created notebook', function(done) {
          const user = testUsers[0];
          const params = {
            id: user._id,
            title: 'Some title'
          };

          request(Server)
            .post('/api/notebook/create')
            .send(params)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);

              assert.ok(body);
              assert.ok(body.title);
              assert.typeOf(body, 'object');

              done();
            });
        });
        it('should 400 if arguments are invalid or already exist', function(done) {
          const user = testUsers[0];
          const params = {
            id: user._id,
            username: 'spongebob',
            title: 'Some title'
          };

          request(Server)
            .post('/api/notebook/create')
            .send(params)
            .expect(400, done);
        });
      });
      describe('GET /notebook/:notebookID', function() {
        it('should return a single notebook', function(done) {
          const user = testUsers[0];
          const notebook = testNotebooks[0][0];

          request(Server)
            .get(`/api/notebook/${notebook.uid}`)
            .send({ id: user._id })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);
              assert.ok(body);
              assert.ok(body.title);
              assert.typeOf(body, 'object');
              done();
            });
        });
        it('should 404 for another users private notebook', function(done) {
          const user = testUsers[2];
          const notebook = testNotebooks[0][1];

          request(Server)
            .get(`/api/notebook/${notebook.uid}`)
            .send({ id: user._id })
            .expect(404, done);
        });
        it('should return a private notebook to the owner', function(done) {
          const user = testUsers[0];
          const notebook = testNotebooks[0][1];

          request(Server)
            .get(`/api/notebook/${notebook.uid}`)
            .send({ id: user._id })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);
              assert.ok(body);
              assert.ok(body.title);
              assert.typeOf(body, 'object');
              done();
            });
        });
      });
      describe('GET /notebooks', function() {
        it('should return an array of notebooks', function(done) {
          const user = testUsers[0];
          request(Server)
            .get('/api/notebooks')
            .send({ id: user._id })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);
              assert.ok(body);
              assert.typeOf(body, 'array');
              done();
            });
        });
      });
    });

    describe('Middleware', function() {
      describe('#updateLastLogin()', function() {
        it('add the user ID to body if a bearer token is found', function(done) {
          const user = testUsers[0];
          const token = jwt.sign({ id: user.id }, 'somesecret');

          request(Server)
            .post('/api/user/token')
            .set('Authorization', `bearer ${token}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);

              assert.ok(body);
              assert.typeOf(body, 'object');
              assert.ok(body.displayName);

              done();
            });
        });
      });
    });

    describe('Authentication', function() {
      describe('POST /login', function() {
        it('should return token if user is found', function(done) {
          const params = {
            method: 'fb',
            email: 'test1@test.org'
          };

          request(Server)
            .post('/auth/login')
            .send(params)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);
              assert.ok(body);
              assert.typeOf(body, 'string');
              done();
            });
        });
        it('should return new user token, if no user found', function(done) {
          const params = {
            method: 'fb',
            email: 'test4@test.org',
            response: {
              name: 'test4',
              accessToken: 'test4',
              userID: 'test4'
            }
          };

          request(Server)
            .post('/auth/login')
            .send(params)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);
              assert.ok(body);
              assert.typeOf(body, 'string');
              done();
            });
        });
        it('should 400 if no email is provided');
        it('should 404 if improper arguments are provided');
      });
    });
  });
});

describe('testing', function() {
  describe('something', function() {
    it('should return nothing', function() {});
  });
});
