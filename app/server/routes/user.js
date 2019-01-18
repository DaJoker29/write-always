import { Router } from 'express';
import Models from '@server/models';

const { User } = Models;

const router = Router();

router.get('/users', fetchAllUsers);

export default router;

async function fetchAllUsers(req, res, next) {
  try {
    res.json(await User.find().lean({ virtuals: true }));
  } catch (e) {
    next(e);
  }
}
