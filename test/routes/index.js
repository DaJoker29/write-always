import '@config';
import db from '@server/db_connect';
import Server from '@server';
import request from 'supertest';
import Models from '@server/models';
import jwt from 'jsonwebtoken';
import { assert } from 'chai';

const { User, Notebook, Entry } = Models;

/////////////
// Helpers //
/////////////

async function populateUsers() {
  return Promise.all([
    await User.create({
      fbUserID: 'test1',
      email: 'test1@test.org',
      todos: [{ text: 'my first todo' }]
    }),
    await User.create({
      fbUserID: 'test2',
      email: 'test2@test.org',
      todos: [{ text: 'my first todo' }]
    }),
    await User.create({
      fbUserID: 'test3',
      email: 'test3@test.org',
      todos: [{ text: 'my first todo' }]
    })
  ]);
}

async function populateNotebooks(users) {
  const notebooks = [];

  users.forEach(async function(user) {
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

    notebooks.push(Notebook.create(first));
    notebooks.push(Notebook.create(second));
    notebooks.push(Notebook.create(third));
  });

  return Promise.all(notebooks);
}

async function populateEntries(notebooks) {
  const entries = [];

  notebooks.forEach(async function(notebook) {
    const first = {
      body: 'Some text',
      author: notebook.owner,
      notebook: notebook._id
    };
    const second = {
      body: 'Some text',
      author: notebook.owner,
      notebook: notebook._id
    };

    entries.push(Entry.create(first));
    entries.push(Entry.create(second));
  });

  return Promise.all(entries);
}

///////////
// Start //
///////////

db.on('connected', function() {
  let testUsers = [];
  let testNotebooks = [];

  describe('API Routes', function() {
    before(async function() {
      testUsers = await populateUsers();
      testNotebooks = await populateNotebooks(testUsers);
      await populateEntries(testNotebooks);
    });

    after(async function() {
      await db.dropDatabase();
      await db.close();
    });

    ////////////////
    // User Tests //
    ////////////////

    describe('Users', function() {
      describe('GET /user/todos', function() {
        it('should return an array of todos for authenticated users', function(done) {
          const user = testUsers[0];
          request(Server)
            .get('/api/user/todos')
            .send({ id: user._id })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);

              assert.typeOf(body, 'array');
              assert.lengthOf(body, 1);

              assert.ok(body[0].text);
              assert.isFalse(body[0].isCompleted);

              done();
            });
        });
        it('should 400 for unauthenticated users', function(done) {
          request(Server)
            .get('/api/user/todos')
            .expect(400, done);
        });
      });

      describe('POST /user/todos/create', function() {
        it('should 200 if successful', function(done) {
          const user = testUsers[0];

          request(Server)
            .post('/api/user/todos/create')
            .send({ id: user._id, text: 'Hey, new todo' })
            .expect(200, done);
        });
        it('should 400 if no text is provided', function(done) {
          const user = testUsers[0];

          request(Server)
            .post('/api/user/todos/create')
            .send({ id: user._id })
            .expect(400, done);
        });
        it('should 400 if user is not authenticated', function(done) {
          request(Server)
            .post('/api/user/todos/create')
            .send({ text: 'Hey, new todo' })
            .expect(400, done);
        });
      });

      describe('POST /user/todos/complete', function() {
        it('should 200 if successful', function(done) {
          const user = testUsers[0];

          request(Server)
            .post('/api/user/todos/complete')
            .send({ id: user._id, todoID: user.todos[0]._id })
            .expect(200, done);
        });
        it('should 400 if no text ID is provided', function(done) {
          const user = testUsers[0];

          request(Server)
            .post('/api/user/todos/complete')
            .send({ id: user._id })
            .expect(400, done);
        });
        it('should 400 if user is not authenticated', function(done) {
          const user = testUsers[0];
          request(Server)
            .post('/api/user/todos/complete')
            .send({ todoID: user.todos[0]._id })
            .expect(400, done);
        });
      });

      describe('POST /user/todos/clear', function() {
        it('should 200 if successful', function(done) {
          const user = testUsers[0];

          request(Server)
            .post('/api/user/todos/clear')
            .send({ id: user._id })
            .expect(200, done);
        });

        it('should 400 if user is not authenticated', function(done) {
          request(Server)
            .post('/api/user/todos/clear')
            .expect(400, done);
        });
      });

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
              assert.isNotOk(user.token);
              assert.isNotOk(user.fbUserID);
              assert.isNotOk(user.fbUserAccess);

              done();
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
        it('should return 500 when when matching ID not found', function(done) {
          const params = {
            id: '12345645',
            userID: '123456',
            accessToken: '123456'
          };

          request(Server)
            .post('/api/user/fb')
            .send(params)
            .expect(500, done);
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

        it('should 500 if invalid ID is provided', function(done) {
          request(Server)
            .post('/api/user/token')
            .send({ id: '12345678' })
            .expect(500, done);
        });

        it('should 400 if no ID is found', function(done) {
          request(Server)
            .post('/api/user/token')
            .expect(400, done);
        });
      });
    });

    /////////////////
    // Entry Tests //
    /////////////////

    describe('Entries', function() {
      describe('POST /entries/recent', function() {
        it('should return a list of recent entries', function(done) {
          const user = testUsers[0];

          const params = {
            id: user._id,
            notebooks: [
              testNotebooks[0]._id,
              testNotebooks[1]._id,
              testNotebooks[2]._id,
              testNotebooks[3]._id,
              testNotebooks[4]._id // to test private filtering
            ]
          };

          request(Server)
            .post('/api/entries/recent')
            .send(params)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);

              assert.ok(body);
              assert.typeOf(body, 'array');
              assert.lengthOf(body, 8);

              done();
            });
        });
      });

      describe('GET /entries/:notebookID', function() {
        it('should return a list of entries (non-private)', function(done) {
          const user = testUsers[0];
          const notebook = testNotebooks[0];

          request(Server)
            .get(`/api/entries/${notebook.uid}`)
            .send({ id: user._id })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);

              assert.ok(body);
              assert.typeOf(body, 'array');
              assert.lengthOf(body, 2);

              done();
            });
        });
        it('should return private entries if user owns them', function(done) {
          const user = testUsers[0];
          const notebook = testNotebooks[1];

          request(Server)
            .get(`/api/entries/${notebook.uid}`)
            .send({ id: user._id })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);

              assert.ok(body);
              assert.typeOf(body, 'array');
              assert.lengthOf(body, 2);

              done();
            });
        });
        it('should 404 for private and non-user notebook', function(done) {
          const user = testUsers[0];
          const notebook = testNotebooks[4];

          request(Server)
            .get(`/api/entries/${notebook.uid}`)
            .send({ id: user._id })
            .expect(404, done);
        });
        it('should 404 if notebook does not exist', function(done) {
          const user = testUsers[0];

          request(Server)
            .get('/api/entries/foo')
            .send({ id: user._id })
            .expect(404, done);
        });
        it('should 400 if no notebook is provided', function(done) {
          const user = testUsers[0];

          request(Server)
            .get('/api/entries/')
            .send({ id: user._id })
            .expect(404, done);
        });
      });

      describe('POST /entry/create', function() {
        it('should return a newly created notebook if credentials match', function(done) {
          const user = testUsers[0];
          const notebook = testNotebooks[0];
          const params = {
            id: user._id,
            notebook: notebook.uid,
            body: 'Some unique content'
          };

          request(Server)
            .post('/api/entry/create')
            .send(params)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async function(err, { body }) {
              if (err) return done(err);

              assert.ok(body);
              assert.ok(body.body);
              assert.typeOf(body, 'object');

              await Entry.deleteOne({ body: params.body });

              done();
            });
        });
        it('should return a 404 if credentials do not match', function(done) {
          const user = testUsers[1];
          const notebook = testNotebooks[0];
          const params = {
            id: user._id,
            notebook: notebook.uid,
            body: 'Some unique content'
          };

          request(Server)
            .post('/api/entry/create')
            .send(params)
            .expect(404, done);
        });
        it('should return a 400 if no body is provided', function(done) {
          const user = testUsers[0];
          const notebook = testNotebooks[0];
          const params = {
            id: user._id,
            notebook: notebook.uid
          };

          request(Server)
            .post('/api/entry/create')
            .send(params)
            .expect(400, done);
        });
      });
    });

    ////////////////////
    // Notebook Tests //
    ////////////////////

    describe('Notebooks', function() {
      describe('POST /notebook/create', function() {
        it('should return a newly created notebook', function(done) {
          const user = testUsers[0];
          const params = {
            id: user._id,
            title: 'Some unique title'
          };

          request(Server)
            .post('/api/notebook/create')
            .send(params)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async function(err, { body }) {
              if (err) return done(err);

              assert.ok(body);
              assert.ok(body.title);
              assert.typeOf(body, 'object');

              await Notebook.deleteOne({ title: params.title });

              done();
            });
        });
        it('should 400 if no title is provided', function(done) {
          const user = testUsers[0];
          const params = {
            id: user._id
          };

          request(Server)
            .post('/api/notebook/create')
            .send(params)
            .expect(400, done);
        });
        it('should 400 if invalid user ID is provided', function(done) {
          const params = {
            title: 'Some unique title'
          };

          request(Server)
            .post('/api/notebook/create')
            .send(params)
            .expect(400, done);
        });
        it('should 400 if no params are provided', function(done) {
          request(Server)
            .post('/api/notebook/create')
            .expect(400, done);
        });
      });
      describe('GET /notebook/:notebookID', function() {
        it('should return a single notebook', function(done) {
          const user = testUsers[0];
          const notebook = testNotebooks[0];

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
          const notebook = testNotebooks[1];

          request(Server)
            .get(`/api/notebook/${notebook.uid}`)
            .send({ id: user._id })
            .expect(404, done);
        });
        it('should return a private notebook to the owner', function(done) {
          const user = testUsers[0];
          const notebook = testNotebooks[1];

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
        it('should return an array of notebooks (with id)', function(done) {
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
              assert.lengthOf(body, 7);
              done();
            });
        });
        it('should return an array of notebooks (without id)', function(done) {
          request(Server)
            .get('/api/notebooks')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);
              assert.ok(body);
              assert.typeOf(body, 'array');
              assert.lengthOf(body, 6);
              done();
            });
        });
      });
    });

    //////////////////////
    // Middleware Tests //
    //////////////////////

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

    //////////////////////////
    // Authentication Tests //
    //////////////////////////

    describe('Authentication', function() {
      describe('POST /login', function() {
        it('should return token if user is found', function(done) {
          const params = {
            method: 'fb',
            email: 'test1@test.org',
            response: {
              displayName: 'test1',
              fbUserAccess: 'test1',
              fbUserID: 'test1'
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
        it('should return new user token, if no user found', function(done) {
          const params = {
            method: 'fb',
            email: 'test4@test.org',
            response: {
              displayName: 'test4',
              fbUserAccess: 'test4',
              fbUserID: 'test4'
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
        it('should 400 no method specified', function(done) {
          const params = {
            email: 'test4@test.org',
            response: {
              displayName: 'test4',
              fbUserAccess: 'test4',
              fbUserID: 'test4'
            }
          };

          request(Server)
            .post('/auth/login')
            .send(params)
            .expect(400, done);
        });
        it('should 400 if no params specified', function(done) {
          request(Server)
            .post('/auth/login')
            .expect(400, done);
        });
      });
    });
  });
});
