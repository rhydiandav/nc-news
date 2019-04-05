const connection = require('../db/connection');

exports.fetchTopics = slug => {
  return connection
    .select('*')
    .from('topics')
    .modify(query => {
      if (slug) query.where({ slug });
    });
};

exports.createTopic = ({ slug, description }) => {
  return connection
    .insert({ slug, description })
    .into('topics')
    .returning('*');
};
