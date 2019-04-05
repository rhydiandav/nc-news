const { fetchUsers } = require('../models/users');

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
