import { Router } from 'express';
import Models from '@server/models';

const { Notebook, User, Entry } = Models;

const router = Router();

router.post('/entry/create', createEntry);
router.get('/entries/', fetchEntries);

export default router;

async function fetchEntries(req, res, next) {
  const { n: uid } = req.query;
  try {
    const notebook = await Notebook.findOne({ uid });
    const entries = await Entry.find({ notebook: notebook._id }).lean();
    res.json(entries);
  } catch (e) {
    next(e);
  }
}

async function createEntry(req, res, next) {
  const { id, username, notebook: uid, ...data } = req.body;
  try {
    const user = await User.findById(id);
    const notebook = await Notebook.findOne({ uid });

    if (user.username === username) {
      data.author = user.id;
      data.notebook = notebook.id;
      const entry = await Entry.create(data);
      res.json(entry);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
}
