const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  deleteArticleByID,
  getCommentsByArticleId
} = require('../controllers/articles');
const articlesRouter = require('express').Router();

articlesRouter.route('/').get(getAllArticles);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(deleteArticleByID);

articlesRouter.route('/:article_id/comments').get(getCommentsByArticleId);

module.exports = articlesRouter;
