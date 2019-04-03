exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.resourceNotFound = (err, req, res, next) => {
  if ((err.status = 404)) {
    res.status(err.status).send({ msg: err.msg });
  }
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};
