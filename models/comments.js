const connection = require('../db/connection');

exports.fetchCommentById = comment_id => {
  return connection
    .select('*')
    .from('comments')
    .where({ comment_id })
    .first();
};

exports.updateComment = (comment_id, inc_votes) => {
  if (!inc_votes) inc_votes = 0;
  return connection
    .increment({ votes: inc_votes })
    .from('comments')
    .where({ comment_id })
    .returning('*');
};

exports.removeComment = comment_id => {
  return connection
    .select('*')
    .from('comments')
    .where({ comment_id })
    .del();
};
