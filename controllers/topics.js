const { fetchTopics } = require('../models/topics');

exports.getTopics = (req, res, next) => {
  const { slug } = req.params;
  fetchTopics(slug)
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};
