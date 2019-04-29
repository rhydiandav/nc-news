exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handleBadRequest = (err, req, res, next) => {
  const psqlCodes = ['42703', '23502'];
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Invalid ID. Please enter a valid ID.' });
  } else if (psqlCodes.includes(err.code)) {
    res.status(400).send({ msg: err.message } || 'Bad Request');
  } else next(err);
};

exports.handleResourceNotFound = (err, req, res, next) => {
  if (err.message === "Cannot read property 'votes' of undefined") {
    res.status(404).send({ msg: 'Resource not found' });
  } else if (err.code === '23503') {
    res.status(404).send({ msg: err.message });
  } else next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};
