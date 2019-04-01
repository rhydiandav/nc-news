const { getAllArticles } = require('../controllers/articles');
const articlesRouter = require('express').Router();

articlesRouter.route('/').get(getAllArticles);

module.exports = articlesRouter;
