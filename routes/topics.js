const { methodNotAllowed } = require('../errors');
const { getAllTopics } = require('../controllers/topics');
const topicsRouter = require('express').Router();

topicsRouter
  .route('/')
  .get(getAllTopics)
  .all(methodNotAllowed);

module.exports = topicsRouter;
