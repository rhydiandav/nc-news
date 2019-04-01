const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require('../data');
const { formatArticles, formatComments } = require('../../utils/seed-helpers');

exports.seed = (connection, Promise) => {
  return connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => {
      return connection.insert(topicsData).into('topics');
    })
    .then(() => {
      return connection.insert(usersData).into('users');
    })
    .then(() => {
      const formattedArticles = formatArticles(articlesData);
      return connection
        .insert(formattedArticles)
        .into('articles')
        .returning('*');
    })
    .then(articles => {
      const formattedComments = formatComments(commentsData, articles);
      return connection.insert(formattedComments).into('comments');
    })
    .then(() => {
      console.log('import complete');
    });
};
