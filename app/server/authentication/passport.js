import passport from 'passport';
import Models from '@server/models';
import config from '@config';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

const { User } = Models;
const {
  app: { secret: secretOrKey }
} = config;

export default function() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'method',
        passwordField: 'id',
        passReqToCallback: true,
        session: false
      },
      async function(req, username, password, cb) {
        try {
          const user = await User.findOne({ fbUserID: password });
          if (user) {
            return cb(null, user, { message: 'Login was successful' });
          }
          return cb(null, false, { message: 'No user found' });
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
        secretOrKey
      },
      async function(payload, cb) {
        try {
          const user = await User.findOne({ _id: payload.id });
          return cb(null, user);
        } catch (e) {
          return cb(e);
        }
      }
    )
  );
}
