import { Router } from 'express';
import Models from '@server/models';

const { Notebook } = Models;

const router = Router();

router.get('/notebooks', fetchAllNotebooks);

export default router;

async function fetchAllNotebooks(req, res, next) {
  try {
    res.json(await Notebook.find({ isPrivate: false }));
  } catch (e) {
    next(e);
  }
}
