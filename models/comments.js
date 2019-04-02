const connection = require('../db/connection');

exports.fetchCommentById = comment_id => {
  return connection
    .select('*')
    .from('comments')
    .where({ comment_id });
};

exports.updateComment = (comment_id, inc_votes) => {
  return connection
    .select('*')
    .from('comments')
    .where({ comment_id })
    .returning('*')
    .then(comment => {
      const newVotes = comment[0].votes + inc_votes;
      return connection
        .select('*')
        .from('comments')
        .where({ comment_id })
        .update({ votes: newVotes })
        .returning('*');
    });
};

exports.removeComment = comment_id => {
  return connection
    .select('*')
    .from('comments')
    .where({ comment_id })
    .del();
};
