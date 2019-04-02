const { getAllArticles, getArticleById } = require('../controllers/articles');
const articlesRouter = require('express').Router();

articlesRouter.route('/').get(getAllArticles);

articlesRouter.route('/:article_id').get(getArticleById);

module.exports = articlesRouter;
