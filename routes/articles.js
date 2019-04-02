const {
  getAllArticles,
  getArticleById,
  patchArticleById
} = require('../controllers/articles');
const articlesRouter = require('express').Router();

articlesRouter.route('/').get(getAllArticles);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById);

module.exports = articlesRouter;
