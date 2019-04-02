const { methodNotAllowed } = require('../errors');
const {
  getCommentById,
  patchComment,
  deleteComment
} = require('../controllers/comments');
const commentsRouter = require('express').Router();

commentsRouter
  .route('/:comment_id')
  .get(getCommentById)
  .patch(patchComment)
  .delete(deleteComment)
  .all(methodNotAllowed);

module.exports = commentsRouter;
