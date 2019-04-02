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
  .delete(deleteComment);

module.exports = commentsRouter;
