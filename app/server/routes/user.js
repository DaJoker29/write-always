import { Router } from 'express';
import Models from '@server/models';

const { User } = Models;

const router = Router();

router.get('/users', fetchAllUsers);
router.post('/user/token', fetchCurrentUser);
router.post('/user/fb', updateFBToken);

export default router;

async function updateFBToken(req, res, next) {
  const { accessToken: fbUserAccess, userID: fbUserID, id } = req.body;

  if (typeof id === 'undefined') {
    return res.sendStatus(400);
  }

  try {
    await User.findOneAndUpdate({ _id: id }, { fbUserID, fbUserAccess });
    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(404);
  }
}

async function fetchCurrentUser(req, res, next) {
  const { id } = req.body;

  if (typeof id === 'undefined') {
    return res.sendStatus(400);
  }

  try {
    const user = await User.findOne(
      { _id: id },
      '+email +token +fbUserAccess +fbUserID'
    ).lean({ virtuals: true });

    return res.json(user);
  } catch (e) {
    // Error fetching user. Either they don't exist or another problem occured.
    return res.sendStatus(404);
  }
}

async function fetchAllUsers(req, res, next) {
  try {
    const users = await User.find().lean({ virtuals: true });
    return res.json(users);
  } catch (e) {
    return res.sendStatus(404);
  }
}
