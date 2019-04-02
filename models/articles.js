const connection = require('../db/connection');

exports.fetchAllArticles = () => {
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
    .orderBy('article_id');
};
