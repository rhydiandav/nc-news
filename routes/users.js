const { methodNotAllowed } = require('../errors');
const { getUser } = require('../controllers/users');
const usersRouter = require('express').Router();

usersRouter
  .route('/')
  .get(getUser)
  .all(methodNotAllowed);

usersRouter
  .route('/:username')
  .get(getUser)
  .all(methodNotAllowed);

module.exports = usersRouter;
