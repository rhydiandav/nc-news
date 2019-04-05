const {
  fetchAllArticles,
  fetchArticleById,
  updateArticle,
  removeArticle,
  fetchComments,
  createComment
} = require('../models/articles');
const { fetchUsers } = require('../models/users');
const { fetchTopics } = require('../models/topics');

exports.getAllArticles = (req, res, next) => {
  Promise.all([
    fetchUsers(req.query.author),
    fetchTopics(req.query.topic),
    fetchAllArticles(req.query)
  ])
    .then(([user, topic, articles]) => {
      if (user.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `User ${req.query.author} doesnt exist`
        });
      }
      if (topic.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Topic '${req.query.topic}' doesnt exist`
        });
      }
      if (articles.length === 1) {
        res.status(200).send({
          article: articles[0]
        });
      } else res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(article => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `no article found for article_id ${article_id}`
        });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  return Promise.all([
    fetchArticleById(article_id),
    updateArticle(article_id, inc_votes)
  ])
    .then(([oldArticle, updatedArticle]) => {
      if (!oldArticle) {
        return Promise.reject({
          status: 404,
          msg: `Article ${article_id} not found`
        });
      }
      res.status(200).send({ article: updatedArticle[0] });
    })
    .catch(next);
};

exports.deleteArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  removeArticle(article_id)
    .then(numDeleted => {
      if (!numDeleted) {
        return Promise.reject({
          status: 404,
          msg: `Article ${article_id} not found`
        });
      }
      res.sendStatus(204);
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  return Promise.all([
    fetchArticleById(article_id),
    fetchComments(article_id, sort_by, order)
  ])
    .then(([article, comments]) => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `no article found for article_id ${article_id}`
        });
      }
      if (comments.length === 1) {
        res.status(200).send({
          comment: comments[0]
        });
      } else res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  createComment(article_id, username, body)
    .then(comment => {
      res.status(201).send({ comment: comment[0] });
    })
    .catch(next);
};
