const connection = require('../db/connection');

exports.fetchCommentById = comment_id => {
  return connection
    .select('*')
    .from('comments')
    .where({ comment_id });
};

exports.updateComment = (comment_id, inc_votes) => {
  return connection
    .select('votes')
    .from('comments')
    .where({ comment_id })
    .first()
    .returning('*')
    .then(comment => {
      return connection
        .update({ votes: comment.votes + inc_votes })
        .from('comments')
        .where({ comment_id });
    })
    .then(() => {
      return connection
        .select('*')
        .from('comments')
        .first()
        .where({ comment_id });
    });
};

exports.removeComment = comment_id => {
  return connection
    .select('*')
    .from('comments')
    .where({ comment_id })
    .del();
};
