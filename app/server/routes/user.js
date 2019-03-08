import { Router } from 'express';
import Models from '@server/models';
import asyncHandler from '@server/middleware/async';
import Log from '@tools/log';

const { User } = Models;
const log = Log('middleware');

const router = Router();

router.get('/users', asyncHandler(fetchAllUsers));
router.get('/user', asyncHandler(fetchUser));
router.post('/user/token', asyncHandler(fetchCurrentUser));
router.post('/user/fb', asyncHandler(updateFBToken));

export default router;

export async function fetchUser(req, res, next) {
  const { email, username } = req.query;

  if (email || username) {
    const user = await User.findOne(req.query).lean();
    return res.json(user);
  } else {
    return res.sendStatus(400);
  }
}

export async function updateFBToken(req, res, next) {
  const { fbUserAccess, fbUserID, id } = req.body;

  if (typeof id === 'undefined') {
    return res.sendStatus(400);
  }

  log(`Updating FB Access Token: ${fbUserID}`);
  await User.findOneAndUpdate({ _id: id, fbUserID }, { fbUserAccess });
  return res.sendStatus(200);
}

export async function fetchCurrentUser(req, res, next) {
  const { id } = req.body;

  if (typeof id === 'undefined') {
    return res.sendStatus(400);
  }

  const user = await User.findOne(
    { _id: id },
    '+email +token +fbUserAccess +fbUserID'
  ).lean({ virtuals: true });

  return res.json(user);
}

export async function fetchAllUsers(req, res, next) {
  const users = await User.find().lean({ virtuals: true });
  return res.json(users);
}
