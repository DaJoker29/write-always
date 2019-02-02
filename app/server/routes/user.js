import { Router } from 'express';
import Models from '@server/models';

const { User } = Models;

const router = Router();

router.get('/users', fetchAllUsers);
router.get('/user/:userID', fetchSingleUser);
router.post('/user/token', fetchCurrentUser);

export default router;

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
