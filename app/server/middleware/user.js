import Models from '@server/models';
import { secret } from '@root/config';
import { verify } from 'jsonwebtoken';

const { User } = Models;

export async function updateLastLogin(req, res, next) {
  if (req.headers.authorization === undefined) {
    next();
  } else {
    try {
      const header = req.headers.authorization.replace(/bearer /gi, '');
      const decoded = verify(header, secret);
      await User.findOneAndUpdate(
        { _id: decoded.id },
        {
          $set: { dateLastLogin: Date.now() }
        }
      );
      next();
    } catch (e) {
      next(e);
    }
  }
}
