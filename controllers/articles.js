const { fetchAllArticles } = require('../models/articles');

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles().then(articles => {
    res.status(200).send({ articles });
  });
};
