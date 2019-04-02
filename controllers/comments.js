const {
  fetchCommentById,
  updateComment,
  removeComment
} = require('../models/comments');

exports.getCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  fetchCommentById(comment_id).then(comment => {
    if (comment.length === 0) {
      res.status(404).send({ msg: 'no comment found with specified ID' });
    } else res.status(200).send({ comment });
  });
};

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateComment(comment_id, inc_votes).then(comment => {
    res.status(200).send({ comment });
  });
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id).then(() => {
    res.status(204).send();
  });
};
