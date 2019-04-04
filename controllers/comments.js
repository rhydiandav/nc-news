const {
  fetchCommentById,
  updateComment,
  removeComment
} = require('../models/comments');

exports.getCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  fetchCommentById(comment_id)
    .then(comment => {
      if (!comment) {
        return Promise.reject({
          status: 404,
          msg: `no comment found for comment_id ${comment_id}`
        });
      } else res.status(200).send({ comment });
    })
    .catch(next);
};

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateComment(comment_id, inc_votes)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  return Promise.all([fetchCommentById(comment_id), removeComment(comment_id)])
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({
          status: 404,
          msg: `Comment ${comment_id} not found`
        });
      } else res.sendStatus(204);
    })
    .catch(next);
};
