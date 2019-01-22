import Models from '@server/models';
import { secret } from '@root/config';
import { verify } from 'jsonwebtoken';
import Log from '@tools/log';

const log = Log('middleware');

const { User } = Models;

export default {
  updateLastLogin
};

export async function updateLastLogin(req, res, next) {
  if (req.headers.authorization === undefined) {
    next();
  } else {
    try {
      const header = req.headers.authorization.replace(/bearer /gi, '');
      const decoded = verify(header, secret);

      if (req.body) {
        req.body = Object.assign(req.body, { id: decoded.id });
      }

      if (req.params) {
        req.params = Object.assign(req.params, { id: decoded.id });
      }

      const user = await User.findOneAndUpdate(
        { _id: decoded.id },
        {
          $set: { dateLastLogin: Date.now() }
        },
        {
          new: true
        }
      );
      log(`Updating Last Login: ${user.uid}`);
      next();
    } catch (e) {
      next(e);
    }
  }
}
