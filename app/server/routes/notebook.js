import { Router } from 'express';
import Models from '@server/models';
import asyncHandler from '@server/middleware/async';

const { Notebook, User } = Models;

const router = Router();

router.get('/notebooks', asyncHandler(fetchAllNotebooks));
router.get('/notebook/:notebookID', asyncHandler(fetchNotebook));
router.post('/notebook/create', asyncHandler(createNotebook));

export default router;

async function fetchNotebook(req, res, next) {
  const { notebookID: uid } = req.params;
  const { id } = req.body;

  const notebook = await Notebook.findOne({ uid })
    .populate('owner')
    .lean({ virtuals: true });

  if (notebook.isPrivate && notebook.owner.id !== id) {
    res.sendStatus(404);
  } else {
    res.json(notebook);
  }
}

async function createNotebook(req, res, next) {
  const { id, ...data } = req.body;
  const user = await User.findById(id);

  if (user && data.title) {
    data.owner = user.id;
    const notebook = await Notebook.create(data);
    return res.json(notebook);
  }
  return res.sendStatus(400);
}

async function fetchAllNotebooks(req, res, next) {
  const { id } = req.body;
  const queries = [{ isPrivate: false }];

  if (id) {
    queries.push({ owner: id });
  }

  const notebooks = await Notebook.find()
    .or(queries)
    .populate('owner')
    .lean({ virtuals: true });

  res.json(notebooks);
}
