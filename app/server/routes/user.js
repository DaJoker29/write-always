import { Router } from 'express';
import Models from '@server/models';
import asyncHandler from '@server/middleware/async';

const { User } = Models;

const router = Router();

router.get('/users', asyncHandler(fetchAllUsers));
router.post('/user/token', asyncHandler(fetchCurrentUser));
router.post('/user/fb', asyncHandler(updateFBToken));

export default router;

async function updateFBToken(req, res, next) {
  const { accessToken: fbUserAccess, userID: fbUserID, id } = req.body;

  if (typeof id === 'undefined') {
    return res.sendStatus(400);
  }

  await User.findOneAndUpdate({ _id: id }, { fbUserID, fbUserAccess });
  return res.sendStatus(200);
}

async function fetchCurrentUser(req, res, next) {
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

async function fetchAllUsers(req, res, next) {
  const users = await User.find().lean({ virtuals: true });
  return res.json(users);
}
