const connection = require('../db/connection');

exports.fetchAllArticles = ({ author, topic, sort_by, order, limit, p }) => {
  return connection
    .select(
      'articles.author',
      'articles.title',
      'articles.article_id',
      'articles.topic',
      'articles.created_at',
      'articles.votes'
    )
    .count('comments.article_id as comment_count')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by || 'created_at', order || 'desc')
    .limit(limit || 10)
    .offset((limit || 10) * (p - 1) || 0)
    .modify(query => {
      if (author) query.where({ 'articles.author': author });
      if (topic) query.where({ 'articles.topic': topic });
    });
};

exports.createArticle = ({ title, body, topic, author }) => {
  return connection
    .insert({ title, body, topic, author })
    .into('articles')
    .returning('*');
};

exports.fetchArticleById = article_id => {
  return connection
    .select(
      'articles.author',
      'articles.title',
      'articles.article_id',
      'articles.body',
      'articles.topic',
      'articles.created_at',
      'articles.votes'
    )
    .count('comments.article_id as comment_count')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .where({ 'articles.article_id': article_id })
    .first();
};

exports.updateArticle = (article_id, inc_votes) => {
  if (!inc_votes) inc_votes = 0;
  return connection
    .increment({ votes: inc_votes })
    .from('articles')
    .where({ article_id })
    .returning('*');
};

exports.removeArticle = article_id => {
  return connection
    .select('*')
    .from('articles')
    .where({ article_id })
    .del();
};

exports.fetchComments = (article_id, { sort_by, order, limit, p }) => {
  return connection
    .select('comment_id', 'votes', 'created_at', 'author', 'body')
    .from('comments')
    .where({ article_id })
    .orderBy(sort_by || 'created_at', order || 'desc')
    .limit(limit || 10)
    .offset((limit || 10) * (p - 1) || 0);
};

exports.createComment = (article_id, username, body) => {
  return connection
    .insert({ article_id, author: username, body })
    .into('comments')
    .returning('*');
};

exports.countArticles = ({ author, topic }) => {
  return connection
    .count()
    .from('articles')
    .modify(query => {
      if (author) query.where({ 'articles.author': author });
      if (topic) query.where({ 'articles.topic': topic });
    })
    .first();
};
