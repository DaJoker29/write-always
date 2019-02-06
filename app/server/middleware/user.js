import Models from '@server/models';
import { verify } from 'jsonwebtoken';
import Log from '@tools/log';
import dotenv from 'dotenv';

dotenv.config();

const log = Log('middleware');

const { User } = Models;

export default {
  updateLastLogin
};

export async function updateLastLogin(req, res, next) {
  if (req.headers.authorization === undefined) {
    next();
  } else {
    const header = req.headers.authorization.replace(/bearer /gi, '');
    const decoded = verify(header, process.env.JWT_SECRET);

    if (req.body) {
      req.body = Object.assign(req.body, { id: decoded.id });
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
  }
}
