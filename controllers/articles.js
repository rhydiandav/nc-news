const {
  fetchAllArticles,
  fetchArticleById,
  updateArticle,
  removeArticle,
  fetchComments
} = require('../models/articles');

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(articles => {
      if (articles.length === 0) {
        res.status(404).send({ msg: 'no article found with specified ID' });
      }
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticle(article_id, inc_votes).then(articles => {
    res.status(200).send({ articles });
  });
};

exports.deleteArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  removeArticle(article_id).then(() => {
    res.status(204).send();
  });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  fetchComments(article_id, sort_by, order).then(comments => {
    res.status(200).send({ comments });
  });
};
