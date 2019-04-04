const { methodNotAllowed } = require('../errors');
const { getTopics } = require('../controllers/topics');
const topicsRouter = require('express').Router();

topicsRouter
  .route('/')
  .get(getTopics)
  .all(methodNotAllowed);

topicsRouter
  .route('/:slug')
  .get(getTopics)
  .all(methodNotAllowed);

module.exports = topicsRouter;
