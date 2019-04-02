const connection = require('../db/connection');

exports.fetchAllArticles = ({ author, topic, sort_by, order }) => {
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
    .orderBy(sort_by || 'article_id', order || 'desc')
    .modify(query => {
      if (author) query.where({ 'articles.author': author });
      if (topic) query.where({ 'articles.topic': topic });
    });
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
    .where({ 'articles.article_id': article_id });
};

exports.updateArticle = (article_id, inc_votes) => {
  return connection
    .select('*')
    .from('articles')
    .where({ article_id })
    .returning('*')
    .then(article => {
      const newVotes = article[0].votes + inc_votes;
      return connection
        .select('*')
        .from('articles')
        .where({ article_id })
        .update({ votes: newVotes })
        .returning('*');
    });
};

exports.removeArticle = article_id => {
  return connection
    .select('*')
    .from('comments')
    .where({ article_id })
    .del()
    .then(() => {
      return connection
        .select('*')
        .from('articles')
        .where({ article_id })
        .del();
    });
};
