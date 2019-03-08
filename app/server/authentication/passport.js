import passport from 'passport';
import Models from '@server/models';
import VError from 'verror';
import { Strategy as LocalStrategy } from 'passport-local';

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
          const user = await User.findOne({ email });

          if (user) {
            // Return user if they exist
            return cb(null, user, { message: 'Login was successful' });
          } else {
            throw new VError('User not found');
          }
        } catch (e) {
          return cb(e, null, { message: 'There was an error' });
        }
      }
    )
  );
}
