const { methodNotAllowed } = require('../errors');
const { getTopics, postTopic } = require('../controllers/topics');
const topicsRouter = require('express').Router();

topicsRouter
  .route('/')
  .get(getTopics)
  .post(postTopic)
  .all(methodNotAllowed);

topicsRouter
  .route('/:slug')
  .get(getTopics)
  .all(methodNotAllowed);

module.exports = topicsRouter;
