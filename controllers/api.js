exports.getAPI = (req, res) => {
  res.status(200).send([
    {
      '/': {
        GET:
          'Responds with an array of available endpoints and their associated methods.'
      }
    },
    { '/topics': { GET: 'Responds with an array of topic objects.' } },
    {
      '/topics/:slug': {
        GET:
          'Responds with an object for the topic matching the specified slug.'
      }
    },
    { '/articles': { GET: 'Responds with an array of article objects.' } },
    {
      '/articles?author=:username': {
        GET:
          'Responds with an array of article objects for the specified user, or a single article object if the user has only one associated article.'
      }
    },
    {
      '/articles?topic=:slug': {
        GET:
          'Responds with an array of article objects for the specified topic slug, or a single article object if the topic has only one associated article.'
      }
    },
    {
      '/articles?sort_by=:sort': {
        GET:
          "Responds with an array of article objects, sorted by the specified column. Results are sorted by 'created_at' by default"
      }
    },
    {
      '/articles?order=:order': {
        GET:
          "Responds with an array of article objects, ordered by the specified order. This can be 'asc' for ascending order, or 'desc' for descending order. Results are in descending order by default."
      }
    },
    {
      '/articles/:article_id': {
        GET:
          'Responds with an article object for the article associated to the specified article ID',
        PATCH:
          "Responds with an article object for the article associated to the specified article ID, with the number of votes updated according to the 'inc_votes' property in the request body.",
        DELETE:
          'Deletes the article associated to the specified article ID. Response body contains no content.'
      }
    },
    {
      '/articles/:article_id/comments': {
        GET:
          'Responds with an array of comment objects for the article associated with the specified article ID, or a single comment object if there is only one.',
        POST:
          "Posts a comment to the article associated with the specified article ID, and responds with the posted comment. Request body takes the fields 'username' and 'body'."
      }
    },
    {
      '/comments/:comment_id': {
        PATCH:
          "Responds with an article object for the article associated to the specified article ID, with the number of votes updated according to the 'inc_votes' property in the request body.",
        DELETE:
          'Deletes the comment associated to the specified comment ID. Response body contains no content.'
      }
    },
    { '/users': { GET: 'Responds with an array of user objects.' } },
    {
      '/users/:username': {
        GET: 'Responds with a user object for the specified username.'
      }
    }
  ]);
};
