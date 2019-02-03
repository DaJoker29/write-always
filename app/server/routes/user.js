import { Router } from 'express';
import Models from '@server/models';

const { User } = Models;

const router = Router();

router.get('/users', fetchAllUsers);
router.get('/user/:userID', fetchSingleUser);
router.post('/user/token', fetchCurrentUser);
router.post('/user/fb', updateFBToken);

export default router;

async function updateFBToken(req, res, next) {
  const { accessToken: fbUserAccess, userID: fbUserID, id } = req.body;

  try {
    await User.findOneAndUpdate({ _id: id }, { fbUserID, fbUserAccess });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function fetchCurrentUser(req, res, next) {
  const { id } = req.body;

  try {
    res.json(await User.findOne({ _id: id }));
  } catch (e) {
    next(e);
  }
}

async function fetchSingleUser(req, res, next) {
  const { userID: uid } = req.params;

  try {
    res.json(await User.findOne({ uid }));
  } catch (e) {
    next(e);
  }
}

async function fetchAllUsers(req, res, next) {
  try {
    res.json(await User.find().lean({ virtuals: true }));
  } catch (e) {
    next(e);
  }
}
