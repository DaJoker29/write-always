import { Router } from 'express';
import Log from '@tools/log';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const errLog = Log('login-error');
const router = Router();

router.post('/login', loginHandler);

export default router;

function loginHandler(req, res) {
  passport.authenticate('local', { session: false }, function(err, user, info) {
    if (err || !user) {
      if (err) {
        errLog(err);
      }

      return res.status(400).json({
        message: info ? info.message : 'Login Failed',
        user
      });
    }

    const { _id: id } = user;

    const token = jwt.sign({ id }, process.env.JWT_SECRET);

    return res.json(token);
  })(req, res);
}
