import { Router } from 'express';
import Models from '@server/models';

const { Notebook, User } = Models;

const router = Router();

router.get('/notebooks', fetchAllNotebooks);
router.get('/notebook/:notebookID', fetchNotebook);
router.post('/notebook/create', createNotebook);

export default router;

async function fetchNotebook(req, res, next) {
  const { notebookID: uid } = req.params;
  const { id } = req.body;

  try {
    const notebook = await Notebook.findOne({ uid })
      .populate('owner')
      .lean({ virtuals: true });

    if (notebook.isPrivate && notebook.owner.id !== id) {
      res.sendStatus(404);
    } else {
      res.json(notebook);
    }
  } catch (e) {
    next(e);
  }
}

async function createNotebook(req, res, next) {
  const { id, username, ...data } = req.body;
  try {
    const user = await User.findById(id);

    if (user.username === username) {
      data.owner = user.id;
      const notebook = await Notebook.create(data);
      res.json(notebook);
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    next(e);
  }
}

async function fetchAllNotebooks(req, res, next) {
  const { id } = req.body;
  const queries = [{ isPrivate: false }];

  if (id) {
    queries.push({ owner: id });
  }

  try {
    const notebooks = await Notebook.find()
      .or(queries)
      .populate('owner')
      .lean({ virtuals: true });

    res.json(notebooks);
  } catch (e) {
    next(e);
  }
}
