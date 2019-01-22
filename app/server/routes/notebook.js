import { Router } from 'express';
import Models from '@server/models';

const { Notebook, User } = Models;

const router = Router();

router.get('/notebooks', fetchAllNotebooks);
router.get('/notebook/:notebookID', fetchNotebook);
router.post('/notebook/create', createNotebook);

export default router;

async function fetchNotebook(req, res, next) {
  const { notebookID: uid, id } = req.params;

  try {
    const notebook = await Notebook.findOne({ uid })
      .populate('owner')
      .lean({ virtuals: true });

    if (notebook.isPrivate && notebook.owner._id !== id) {
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
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
}

async function fetchAllNotebooks(req, res, next) {
  try {
    res.json(
      await Notebook.find({ isPrivate: false }).lean({ virtuals: true })
    );
  } catch (e) {
    next(e);
  }
}
