import { Router } from 'express';
import Models from '@server/models';

const { User } = Models;

const router = Router();

router.get('/users', fetchAllUsers);

export default router;

async function fetchAllUsers(req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
    // Info needed to attach:
    // Display Name - (Done)
    // Location
    // dateJoined
    // Story Count / Critique Count
  } catch (e) {
    next(e);
  }
}
