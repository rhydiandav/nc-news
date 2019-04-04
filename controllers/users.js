const { fetchUser } = require('../models/users');

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  fetchUser(username)
    .then(user => {
      if (!user) {
        return Promise.reject({
          status: 404,
          msg: `User ${username} does not exist`
        });
      } else res.status(200).send({ user });
    })
    .catch(next);
};
