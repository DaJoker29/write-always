import { Router } from 'express';
import Models from '@server/models';
import asyncHandler from '@server/middleware/async';

const { Notebook, Entry } = Models;

const router = Router();

router.post('/entry/create', asyncHandler(createEntry));
router.post('/entries/recent', asyncHandler(fetchRecentEntries));
router.get('/entries/:notebookID', asyncHandler(fetchEntries));

export default router;

async function fetchRecentEntries(req, res, next) {
  const { notebooks: notebookIDs, id } = req.body;
  const notebookQueries = notebookIDs.map(notebookID => {
    return Notebook.findById(notebookID).populate('owner');
  });

  const notebooks = (await Promise.all(notebookQueries)).filter(
    e => e.owner.id === id || e.isPrivate === false
  );

  const entries = (await Promise.all(
    notebooks.map(e =>
      Entry.find({ notebook: e._id })
        .limit(3)
        .populate('notebook author')
        .lean({ virtuals: true })
    )
  )).reduce((acc, curr) => acc.concat(curr), []);

  res.json(entries);
}

async function fetchEntries(req, res, next) {
  const { notebookID } = req.params;
  const { id } = req.body;

  const notebook = await Notebook.findOne({ uid: notebookID }).populate(
    'owner'
  );

  if (!notebook || (notebook.isPrivate && notebook.owner.id !== id)) {
    res.sendStatus(404);
  } else {
    const entries = await Entry.find({ notebook: notebook._id })
      .populate('notebook author')
      .lean({ virtuals: true });
    res.json(entries);
  }
}

async function createEntry(req, res, next) {
  const { id, notebook: uid, ...data } = req.body;

  if (!data.body) {
    return res.sendStatus(400);
  }
  const notebook = await Notebook.findOne({ uid }).populate('owner');

  if (notebook && (notebook.isShared || notebook.owner.id === id)) {
    data.notebook = notebook.id;
    data.author = id;
    const entry = await Entry.create(data);
    await Notebook.findOneAndUpdate({ uid }, { updatedAt: new Date() });
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
}
