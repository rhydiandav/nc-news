const { patchComment } = require('../controllers/comments');
const commentsRouter = require('express').Router();

commentsRouter.route('/:comment_id').patch(patchComment);

module.exports = commentsRouter;
