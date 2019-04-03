const { methodNotAllowed } = require('../errors');

const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  deleteArticleByID,
  getCommentsByArticleId,
  postComment
} = require('../controllers/articles');
const articlesRouter = require('express').Router();

articlesRouter
  .route('/')
  .get(getAllArticles)
  .all(methodNotAllowed);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(deleteArticleByID)
  .all(methodNotAllowed);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postComment)
  .all(methodNotAllowed);

module.exports = articlesRouter;
