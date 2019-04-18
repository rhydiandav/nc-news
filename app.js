const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
const {
  routeNotFound,
  handleCustomErrors,
  handleBadRequest,
  handleResourceNotFound,
  handle500
} = require('./errors');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', apiRouter);

app.all('/*', routeNotFound);

app.use(handleCustomErrors);

app.use(handleBadRequest);

app.use(handleResourceNotFound);

app.use(handle500);

module.exports = app;
