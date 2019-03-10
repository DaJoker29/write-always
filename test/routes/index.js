import '@config';
import db from '@server/db_connect';
import Server from '@server';
import request from 'supertest';
import Models from '@server/models';
import jwt from 'jsonwebtoken';
import { assert } from 'chai';

const { User, FeedEntry, Story } = Models;

/////////////
// Helpers //
/////////////

async function populateUsers() {
  return Promise.all([
    await User.create({
      displayName: 'test1',
      username: 'test1',
      email: 'test1@test.org'
    }),
    await User.create({
      displayName: 'test2',
      username: 'test2',
      email: 'test2@test.org'
    }),
    await User.create({
      displayName: 'test3',
      username: 'test3',
      email: 'test3@test.org'
    })
  ]);
}

async function populateFeedEntries(users) {
  const feedEntries = [];

  users.forEach(async function(user) {
    const first = {
      content: 'first',
      author: user._id
    };

    const second = {
      content: 'second',
      author: user._id
    };

    const third = {
      content: 'third',
      author: user._id
    };

    feedEntries.push(FeedEntry.create(first));
    feedEntries.push(FeedEntry.create(second));
    feedEntries.push(FeedEntry.create(third));
  });

  return Promise.all(feedEntries);
}
async function populateStories(users) {
  const stories = [];

  users.forEach(async function(user) {
    const first = {
      content: 'first',
      title: 'first',
      author: user._id
    };

    const second = {
      content: 'second',
      title: 'second',
      author: user._id
    };

    const third = {
      content: 'third',
      title: 'third',
      author: user._id
    };

    stories.push(Story.create(first));
    stories.push(Story.create(second));
    stories.push(Story.create(third));
  });

  return Promise.all(stories);
}

///////////
// Start //
///////////

db.on('connected', function() {
  let testUsers = [];

  describe('API Routes', function() {
    before(async function() {
      testUsers = await populateUsers();
      await populateFeedEntries(testUsers);
      await populateStories(testUsers);
    });

    after(async function() {
      await db.dropDatabase();
      await db.close();
    });

    /////////////////
    // Story Tests //
    /////////////////

    describe('Stories', function() {
      describe('GET /stories', function() {
        it('should return an array of stories', function(done) {
          request(Server())
            .get('/api/stories')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);
              assert.typeOf(body, 'array');
              assert.lengthOf(body, 9);

              assert.ok(body[0].content);
              assert.ok(body[0].author);
              assert.ok(body[0].title);
              done();
            });
        });
      });

      describe('POST /story/create', function() {
        it('should return 400 if no content is provided', function(done) {
          const user = testUsers[0];
          const params = {
            id: user.id,
            title: 'Some title'
          };

          request(Server())
            .post('/api/story/create')
            .send(params)
            .expect(400, done);
        });
        it('should return 400 if no title is provided', function(done) {
          const user = testUsers[0];
          const params = {
            id: user.id,
            content: "Doesn't matter"
          };

          request(Server())
            .post('/api/story/create')
            .send(params)
            .expect(400, done);
        });
        it('should return 400 if no ID is provided', function(done) {
          const params = {
            content: "Doesn't matter"
          };

          request(Server())
            .post('/api/story/create')
            .send(params)
            .expect(400, done);
        });
        it('should return 200 if entry was successfully created', function(done) {
          const user = testUsers[0];
          const params = {
            title: 'Some title',
            id: user.id,
            content: 'This content will be used.'
          };

          request(Server())
            .post('/api/story/create')
            .send(params)
            .expect(200, done);
        });
      });
    });

    //////////////////////
    // Feed Entry Tests //
    //////////////////////

    describe('Feed Entries', function() {
      describe('GET /feed', function() {
        it('should return a list of users', function(done) {
          request(Server())
            .get('/api/feed')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);
              assert.typeOf(body, 'array');
              assert.lengthOf(body, 9);

              assert.ok(body[0].content);
              assert.ok(body[0].author);
              done();
            });
        });
      });

      describe('POST /feed/create', function() {
        it('should return 400 if no content is provided', function(done) {
          const user = testUsers[0];
          const params = {
            id: user.id
          };

          request(Server())
            .post('/api/feed/create')
            .send(params)
            .expect(400, done);
        });
        it('should return 400 if no ID is provided', function(done) {
          const params = {
            content: "Doesn't matter"
          };

          request(Server())
            .post('/api/feed/create')
            .send(params)
            .expect(400, done);
        });
        it('should return 200 if entry was successfully created', function(done) {
          const user = testUsers[0];
          const params = {
            id: user.id,
            content: 'This content will be used.'
          };

          request(Server())
            .post('/api/feed/create')
            .send(params)
            .expect(200, done);
        });
      });
    });

    ////////////////
    // User Tests //
    ////////////////

    describe('Users', function() {
      describe('GET /users', function() {
        it('should return a list of users', function(done) {
          request(Server())
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, { body }) {
              if (err) return done(err);

              assert.typeOf(body, 'array');
              assert.lengthOf(body, 3);

              const user = body[0];
              assert.isOk(user._id);
              assert.isOk(user.createdAt);
              assert.isOk(user.displayName);
              assert.isOk(user.lastActive);
              assert.isOk(user.updatedAt);
              assert.isOk(user.username);
              assert.isNotOk(user.email);
              assert.isNotOk(user.token);

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

          request(Server())
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

          request(Server())
            .post('/api/user/fb')
            .send(params)
            .expect(400, done);
        });
        it('should return 400 when no arguments are provided', function(done) {
          request(Server())
            .post('/api/user/fb')
            .expect(400, done);
        });
        it('should return 500 when when matching ID not found', function(done) {
          const params = {
            id: '12345645',
            userID: '123456',
            accessToken: '123456'
          };

          request(Server())
            .post('/api/user/fb')
            .send(params)
            .expect(500, done);
        });
      });

      describe('POST /user/token', function() {
        it('should return a specified user based on the ID provided', function(done) {
          const user = testUsers[1];
          request(Server())
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

              assert.equal(user._id, res._id, '_id does not match');
              assert.equal(
                user.displayName,
                res.displayName,
                'displayName does not match'
              );
              assert.equal(
                user.username,
                res.username,
                'username does not match'
              );

              done();
            });
        });

        it('should 500 if invalid ID is provided', function(done) {
          request(Server())
            .post('/api/user/token')
            .send({ id: '12345678' })
            .expect(500, done);
        });

        it('should 400 if no ID is found', function(done) {
          request(Server())
            .post('/api/user/token')
            .expect(400, done);
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

          request(Server())
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

          request(Server())
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
        it('should 400 if no user found', function(done) {
          const params = {
            method: 'fb',
            email: 'test4@test.org',
            response: {
              displayName: 'test4',
              fbUserAccess: 'test4',
              fbUserID: 'test4'
            }
          };

          request(Server())
            .post('/auth/login')
            .send(params)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
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

          request(Server())
            .post('/auth/login')
            .send(params)
            .expect(400, done);
        });
        it('should 400 if no params specified', function(done) {
          request(Server())
            .post('/auth/login')
            .expect(400, done);
        });
      });
    });
  });
});
