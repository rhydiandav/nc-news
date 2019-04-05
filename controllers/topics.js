const { fetchTopics, createTopic } = require('../models/topics');

exports.getTopics = (req, res, next) => {
  const { slug } = req.params;
  fetchTopics(slug)
    .then(topics => {
      if (topics.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Topic '${slug}' not found.`
        });
      }
      if (topics.length === 1) {
        res.status(200).send({ topic: topics[0] });
      } else res.status(200).send({ topics });
    })
    .catch(next);
};

exports.postTopic = (req, res, next) => {
  createTopic(req.body)
    .then(topic => {
      res.status(201).send({ topic: topic[0] });
    })
    .catch(next);
};
