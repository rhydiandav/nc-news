const { fetchUsers, createUser, removeUser } = require('../models/users');

exports.getUsers = (req, res, next) => {
  const { username } = req.params;
  fetchUsers(username)
    .then(users => {
      if (users.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `User ${username} does not exist`
        });
      }
      if (users.length === 1) {
        res.status(200).send({ user: users[0] });
      } else res.status(200).send({ users });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  createUser(req.body)
    .then(user => {
      res.status(201).send({ user: user[0] });
    })
    .catch(next);
};

exports.deleteUser = (req, res, next) => {
  const { username } = req.params;
  removeUser(username)
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
