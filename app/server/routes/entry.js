import { Router } from 'express';
import Models from '@server/models';

const { Notebook, User, Entry } = Models;

const router = Router();

router.post('/entry/create', createEntry);
router.post('/entries/recent', fetchRecentEntries);
router.get('/entries/:notebookID', fetchEntries);

export default router;

async function fetchRecentEntries(req, res, next) {
  const { notebooks: notebookIDs, id } = req.body;
  try {
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
  } catch (e) {
    next(e);
  }
}

async function fetchEntries(req, res, next) {
  const { notebookID } = req.params;
  const { id } = req.body;

  try {
    const notebook = await Notebook.findOne({ uid: notebookID }).populate(
      'owner'
    );

    if (notebook.isPrivate && notebook.owner.id !== id) {
      res.sendStatus(404);
    } else {
      const entries = await Entry.find({ notebook: notebook._id })
        .populate('notebook author')
        .lean({ virtuals: true });
      res.json(entries);
    }
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
      await Notebook.findOneAndUpdate({ uid }, { updatedAt: new Date() });
      res.json(entry);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
}
