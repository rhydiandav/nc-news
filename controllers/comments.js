const { updateComment } = require('../models/comments');

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateComment(comment_id, inc_votes).then(comment => {
    res.status(200).send({ comment });
  });
};
