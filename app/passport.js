import passport from 'passport';
import notp from 'notp';
import Models from '@server/models';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

const { User } = Models;

passport.use(
  new LocalStrategy(async function(username, password, cb) {
    try {
      const user = await User.findOne({ username }, { token: 1, username: 1 });
      const login = notp.totp.verify(password, user.token);

      if (login) {
        return cb(null, user, { message: 'Login was successful' });
      }
      return cb(null, false, { message: 'No user found' });
    } catch (e) {
      return cb(e, null, { message: 'There was an error' });
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'somesecret'
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
