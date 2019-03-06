import { Router } from 'express';
import Models from '@server/models';
import asyncHandler from '@server/middleware/async';

const { Story } = Models;

const router = Router();

router.post('/story/create', asyncHandler(createNewStory));
router.get('/stories', asyncHandler(fetchStories));

export default router;

async function fetchStories(req, res, next) {
  const story = await Story.find({})
    .sort('-createdAt')
    .limit(9)
    .populate('author')
    .lean();
  return res.json(story);
}

async function createNewStory(req, res, next) {
  const { id, ...data } = req.body;

  if (!id || !data.title || !data.content) {
    return res.sendStatus(400);
  }

  data.author = id;

  await Story.create(data);
  return res.sendStatus(200);
}
