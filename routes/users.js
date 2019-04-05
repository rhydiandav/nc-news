const { methodNotAllowed } = require('../errors');
const { getUsers, postUser } = require('../controllers/users');
const usersRouter = require('express').Router();

usersRouter
  .route('/')
  .get(getUsers)
  .post(postUser)
  .all(methodNotAllowed);

usersRouter
  .route('/:username')
  .get(getUsers)
  .all(methodNotAllowed);

module.exports = usersRouter;
