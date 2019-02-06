import passport from 'passport';
import Models from '@server/models';
import VError from 'verror';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

const { User } = Models;

export default function() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'method',
        passwordField: 'email',
        passReqToCallback: true,
        session: false
      },
      async function(req, method, email, cb) {
        try {
          const options = {};

          if (method === 'fb') {
            options.email = email;
            options.fbUserID = req.body.response.fbUserID;
          } else {
            throw new VError('No method specified');
          }

          const user = await User.findOne(options);

          if (user) {
            // Return user if they exist
            return cb(null, user, { message: 'Login was successful' });
          } else {
            // Otherwise, create new user
            const { displayName, fbUserID, fbUserAccess } = req.body.response;
            const query = {
              email,
              displayName,
              fbUserID,
              fbUserAccess
            };

            const newUser = await User.create(query);
            return cb(null, newUser, { message: 'New account created' });
          }
        } catch (e) {
          return cb(e, null, { message: 'There was an error' });
        }
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
      },
      async function(payload, cb) {
        try {
          const user = await User.findOne({ _email: payload.email });
          return cb(null, user);
        } catch (e) {
          return cb(e);
        }
      }
    )
  );
}
