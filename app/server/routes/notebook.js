import { Router } from 'express';
import Models from '@server/models';

const { Notebook, User } = Models;

const router = Router();

router.get('/notebooks', fetchAllNotebooks);
router.post('/notebook/create', createNotebook);

export default router;

async function createNotebook(req, res, next) {
  const { id, username, ...data } = req.body;
  try {
    const user = await User.findById(id);

    if (user.username === username) {
      data.owner = user.id;
      const notebook = await Notebook.create(data);
      res.json(notebook);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
}

async function fetchAllNotebooks(req, res, next) {
  try {
    res.json(await Notebook.find({ isPrivate: false }));
  } catch (e) {
    next(e);
  }
}
