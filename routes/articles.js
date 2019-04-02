const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  deleteArticleByID
} = require('../controllers/articles');
const articlesRouter = require('express').Router();

articlesRouter.route('/').get(getAllArticles);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(deleteArticleByID);

module.exports = articlesRouter;
