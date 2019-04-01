const { getAllTopics } = require('../controllers/topics');
const topicsRouter = require('express').Router();

topicsRouter.route('/').get(getAllTopics);

module.exports = topicsRouter;
