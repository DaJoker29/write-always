import { Router } from 'express';
import Models from '@server/models';
import asyncHandler from '@server/middleware/async';
import Log from '@tools/log';

const { User } = Models;
const log = Log('middleware');

const router = Router();

router.get('/users', asyncHandler(fetchAllUsers));
router.post('/user/token', asyncHandler(fetchCurrentUser));
router.post('/user/fb', asyncHandler(updateFBToken));
router.post('/user/todos/create', asyncHandler(createTodo));
router.post('/user/todos/complete', asyncHandler(completeTodo));
router.post('/user/todos/clear', asyncHandler(clearTodos));
router.get('/user/todos', asyncHandler(fetchTodos));

export default router;

export async function clearTodos(req, res, next) {
  const { id } = req.body;

  if (typeof id === 'undefined') {
    return res.sendStatus(400);
  }

  await User.findOneAndUpdate(
    { _id: id },
    { $pull: { todos: { isCompleted: true } } }
  );

  return res.sendStatus(200);
}

export async function completeTodo(req, res, next) {
  const { id, todoID } = req.body;

  if (typeof id === 'undefined' || typeof todoID === 'undefined') {
    return res.sendStatus(400);
  }

  await User.findOneAndUpdate(
    { _id: id, 'todos._id': todoID },
    { $set: { 'todos.$.isCompleted': true } }
  );

  return res.sendStatus(200);
}

export async function createTodo(req, res, next) {
  const { id, text } = req.body;

  if (typeof id === 'undefined' || typeof text === 'undefined') {
    return res.sendStatus(400);
  }

  const todo = {
    text,
    isCompleted: false
  };

  await User.findOneAndUpdate({ _id: id }, { $push: { todos: todo } });

  return res.sendStatus(200);
}

export async function fetchTodos(req, res, next) {
  const { id } = req.body;

  if (typeof id === 'undefined') {
    return res.sendStatus(400);
  }

  const user = await User.findOne({ _id: id })
    .select('todos')
    .lean();

  return res.json(user.todos);
}

export async function updateFBToken(req, res, next) {
  const { fbUserAccess, fbUserID, id } = req.body;

  if (typeof id === 'undefined') {
    return res.sendStatus(400);
  }

  log(`Updating FB Access Token: ${fbUserID}`);
  await User.findOneAndUpdate({ _id: id, fbUserID }, { fbUserAccess });
  return res.sendStatus(200);
}

export async function fetchCurrentUser(req, res, next) {
  const { id } = req.body;

  if (typeof id === 'undefined') {
    return res.sendStatus(400);
  }

  const user = await User.findOne(
    { _id: id },
    '+email +token +fbUserAccess +fbUserID'
  ).lean({ virtuals: true });

  return res.json(user);
}

export async function fetchAllUsers(req, res, next) {
  const users = await User.find().lean({ virtuals: true });
  return res.json(users);
}
