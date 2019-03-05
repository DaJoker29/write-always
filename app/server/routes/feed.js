import { Router } from 'express';
import Models from '@server/models';
import asyncHandler from '@server/middleware/async';

const { FeedEntry } = Models;

const router = Router();

router.post('/feed/create', asyncHandler(createFeedEntry));
router.get('/feed', asyncHandler(fetchFeed));

export default router;

async function fetchFeed(req, res, next) {
  const feed = await FeedEntry.find({})
    .sort('-createdAt')
    .limit(10)
    .populate('author')
    .lean();
  return res.json(feed);
}

async function createFeedEntry(req, res, next) {
  const { id, content } = req.body;

  if (!content) {
    return res.sendStatus(400);
  }

  await FeedEntry.create({ author: id, content });
  return res.sendStatus(200);
}
