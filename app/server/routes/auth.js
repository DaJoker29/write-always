import { Router } from 'express';
import Log from '@tools/log';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const log = Log();
const router = Router();

router.post('/login', loginHandler);

module.exports = router;

function loginHandler(req, res) {
  passport.authenticate('local', { session: false }, function(err, user, info) {
    if (err || !user) {
      if (err) {
        log(err);
      }

      return res.status(400).json({
        message: info ? info.message : 'Login Failed',
        user
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }

      const { _id: id, username } = user;

      const token = jwt.sign({ id }, 'somesecret');

      return res.json({ token, username });
    });
  })(req, res);
}
