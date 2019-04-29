const connection = require('../db/connection');

exports.fetchUsers = username => {
  return connection
    .select('*')
    .from('users')
    .modify(query => {
      if (username) query.where({ username });
    });
};

exports.createUser = ({ username, avatar_url, name }) => {
  return connection
    .insert({ username, avatar_url, name })
    .into('users')
    .returning('*');
};

exports.removeUser = username => {
  return connection
    .select('*')
    .from('users')
    .where({ username })
    .del();
};
