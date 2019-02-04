import { Router } from 'express';
import Models from '@server/models';

const { Notebook, User, Entry } = Models;

const router = Router();

router.post('/entry/create', createEntry);
router.post('/entries/recent', fetchRecentEntries);

export default router;

async function fetchRecentEntries(req, res, next) {
  const { notebooks, id } = req.body;
  try {
    const list = notebooks.map(notebookID => {
      return Notebook.findById(notebookID).populate('owner');
    });

    const notebookList = (await Promise.all(list)).filter(
      e => e.owner.id === id || e.isPrivate === false
    );

    const entryList = await Promise.all(
      notebookList.map(e =>
        Entry.find({ notebook: e._id })
          .limit(3)
          .populate('notebook owner')
          .lean({ virtuals: true })
      )
    );

    const entries = entryList.reduce((acc, curr) => acc.concat(curr), []);

    res.json(entries);
  } catch (e) {
    next(e);
  }
}

// async function fetchEntries(req, res, next) {
//   const { n: uid } = req.query;
//   try {
//     const notebook = await Notebook.findOne({ uid });
//     const entries = await Entry.find({ notebook: notebook._id })
//       .populate('notebook author')
//       .lean({ virtuals: true });
//     res.json(entries);
//   } catch (e) {
//     next(e);
//   }
// }

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
