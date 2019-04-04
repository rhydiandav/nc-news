const connection = require('../db/connection');

exports.fetchUsers = username => {
  return connection
    .select('*')
    .from('users')
    .modify(query => {
      if (username) query.where({ username });
    });
};
