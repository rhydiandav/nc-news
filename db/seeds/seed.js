const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require('../data');
const { formatArticles } = require('../../utils/seed-helpers');

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
      formatArticles(articlesData);
      return connection.insert(articlesData).into('articles');
    })
    .then(() => {});
};
