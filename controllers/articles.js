const { fetchAllArticles, fetchArticleById } = require('../models/articles');

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id).then(articles => {
    res.status(200).send({ articles });
  });
};
