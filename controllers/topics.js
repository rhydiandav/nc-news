const { fetchTopics } = require('../models/topics');

exports.getTopics = (req, res, next) => {
  const { slug } = req.params;
  fetchTopics(slug)
    .then(topics => {
      if (topics.length === 1) {
        res.status(200).send({ topic: topics[0] });
      } else res.status(200).send({ topics });
    })
    .catch(next);
};
