const { methodNotAllowed } = require('../errors');
const { getUsers } = require('../controllers/users');
const usersRouter = require('express').Router();

usersRouter
  .route('/')
  .get(getUsers)
  .all(methodNotAllowed);

usersRouter
  .route('/:username')
  .get(getUsers)
  .all(methodNotAllowed);

module.exports = usersRouter;
