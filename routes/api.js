const apiRouter = require('express').Router();
const topicsRouter = require('./topics');
const articlesRouter = require('./articles');
const { methodNotAllowed } = require('../errors');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);

// apiRouter
//   .route('/')
//   .get((req, res) => res.send({ ok: true }))
//   .all(methodNotAllowed);

module.exports = apiRouter;
