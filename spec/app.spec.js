process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe.only('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/api', () => {
    describe('/topics', () => {
      it('GET status:200 serves up an array of topic objects, with slug and description properties', () => {
        return request
          .get('/api/topics')
          .expect(200)
          .then(res => {
            expect(res.body.topics[0].description).to.equal(
              'The man, the Mitch, the legend'
            );
            expect(res.body.topics[0].slug).to.equal('mitch');
          });
      });
      it('invalid method status:405', () => {
        return request
          .put('/api/topics')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
    });
    describe('/articles', () => {
      it('GET status:200 serves up an array of article objects', () => {
        return request
          .get('/api/articles')
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles[0]).to.have.keys(
              'author',
              'title',
              'article_id',
              'topic',
              'created_at',
              'votes',
              'comment_count'
            );
            expect(res.body.articles[0].article_id).to.equal(1);
            expect(res.body.articles[0].author).to.equal('butter_bridge');
          });
      });
      it('GET status:200 should accept query author, which filters articles by author', () => {
        return request
          .get('/api/articles?author=butter_bridge')
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles.length).to.equal(3);
          });
      });
      it('GET status:200 for an author that has no articles should return an empty array', () => {
        return request
          .get('/api/articles?author=newuser')
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles.length).to.equal(0);
          });
      });
      it('GET status:200 should accept query topic, which filters articles by topic', () => {
        return request
          .get('/api/articles?topic=mitch')
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles.length).to.equal(11);
          });
      });
      it('GET status:200 when querying a topic that exists but has no articles', () => {
        return request
          .get('/api/articles?topic=unused-topic')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles.length).to.equal(0);
          });
      });
      it('GET status:200 should accept query sort_by, which sorts results by specified column', () => {
        return request
          .get('/api/articles?sort_by=author')
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles[0].author).to.equal('rogersop');
          });
      });
      it('GET status:400 when passed an invalid sort_by query', () => {
        return request
          .get('/api/articles/?sort_by=not-a-column')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              'select "articles"."author", "articles"."title", "articles"."article_id", "articles"."topic", "articles"."created_at", "articles"."votes", count("comments"."article_id") as "comment_count" from "articles" left join "comments" on "articles"."article_id" = "comments"."article_id" group by "articles"."article_id" order by "not-a-column" desc - column "not-a-column" does not exist'
            );
          });
      });
      it('GET status:200 should accept query order, which sorts results asc or desc', () => {
        return request
          .get('/api/articles?sort_by=topic&order=asc')
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles[0].topic).to.equal('cats');
          });
      });
      it('invalid method status:405', () => {
        return request
          .put('/api/articles')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
    });
    describe('/articles/:article_id', () => {
      it('GET status:200 should return an object with information on the article', () => {
        return request
          .get('/api/articles/1')
          .expect(200)
          .then(res => {
            expect(res.body.article).to.be.an('object');
            expect(res.body.article.article_id).to.equal(1);
          });
      });
      it('GET status:404 for article number that is valid but doesnt exist', () => {
        return request
          .get('/api/articles/100')
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal(
              'no article found for article_id 100'
            );
          });
      });
      it('GET status:400 for article with invalid id', () => {
        return request
          .get('/api/articles/invalid-id')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              'select "articles"."author", "articles"."title", "articles"."article_id", "articles"."body", "articles"."topic", "articles"."created_at", "articles"."votes", count("comments"."article_id") as "comment_count" from "articles" left join "comments" on "articles"."article_id" = "comments"."article_id" where "articles"."article_id" = $1 group by "articles"."article_id" limit $2 - invalid input syntax for integer: "invalid-id"'
            );
          });
      });
      it('PATCH status:200 with article id should return updated article as an object', () => {
        return request
          .patch('/api/articles/1')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(res => {
            expect(res.body.article).to.be.an('object');
            expect(res.body.article.article_id).to.equal(1);
            expect(res.body.article.votes).to.equal(101);
          });
      });
      it('PATCH status:200 with article id should allow negative votes', () => {
        return request
          .patch('/api/articles/1')
          .send({ inc_votes: -5 })
          .expect(200)
          .then(res => {
            expect(res.body.article).to.be.an('object');
            expect(res.body.article.article_id).to.equal(1);
            expect(res.body.article.votes).to.equal(95);
          });
      });
      it('PATCH status:404 when article doesnt exist', () => {
        return request
          .patch('/api/articles/100')
          .send({ inc_votes: 1 })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('Article 100 not found');
          });
      });
      it('PATCH status:400 when article id is invalid', () => {
        return request
          .patch('/api/articles/not-an-id')
          .send({ inc_votes: 1 })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              'select "articles"."author", "articles"."title", "articles"."article_id", "articles"."body", "articles"."topic", "articles"."created_at", "articles"."votes", count("comments"."article_id") as "comment_count" from "articles" left join "comments" on "articles"."article_id" = "comments"."article_id" where "articles"."article_id" = $1 group by "articles"."article_id" limit $2 - invalid input syntax for integer: "not-an-id"'
            );
          });
      });
      it('PATCH status:200 will return unaltered article when no inc_votes in body', () => {
        return request
          .patch('/api/articles/1')
          .send({})
          .expect(200)
          .then(res => {
            expect(res.body.article).to.be.an('object');
            expect(res.body.article.article_id).to.equal(1);
            expect(res.body.article.votes).to.equal(100);
          });
      });
      it('PATCH status:400 when value of inc_votes is not a number', () => {
        return request
          .patch('/api/articles/1')
          .send({ inc_votes: 'not-a-number' })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              'update "articles" set "votes" = "votes" + $1 where "article_id" = $2 returning * - invalid input syntax for integer: "NaN"'
            );
          });
      });
      it('PATCH status:200 should return updated article when req body contains unused properties', () => {
        return request
          .patch('/api/articles/1')
          .send({ inc_votes: 1, key: 'value' })
          .expect(200)
          .then(res => {
            expect(res.body.article).to.be.an('object');
            expect(res.body.article.article_id).to.equal(1);
            expect(res.body.article.votes).to.equal(101);
          });
      });
      it('DELETE status:204 will remove specified article', () => {
        return request
          .delete('/api/articles/1')
          .expect(204)
          .then(res => {
            expect(res.body).to.eql({});
          })
          .then(() => {
            return request
              .get('/api/articles/1')
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.equal(
                  'no article found for article_id 1'
                );
              });
          });
      });
      it('DELETE status:404 for article that doesnt exist', () => {
        return request
          .delete('/api/articles/1000')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('Article 1000 not found');
          });
      });
      it('DELETE status:400 for invalid article id', () => {
        return request
          .delete('/api/articles/not-an-article')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              'select "articles"."author", "articles"."title", "articles"."article_id", "articles"."body", "articles"."topic", "articles"."created_at", "articles"."votes", count("comments"."article_id") as "comment_count" from "articles" left join "comments" on "articles"."article_id" = "comments"."article_id" where "articles"."article_id" = $1 group by "articles"."article_id" limit $2 - invalid input syntax for integer: "not-an-article"'
            );
          });
      });
      it('invalid method status:405', () => {
        return request
          .put('/api/articles/1')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
    });
    describe('/articles/:article_id/comments', () => {
      it('GET status:200 should respond with an array of comments for the given article id', () => {
        return request
          .get('/api/articles/1/comments')
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.be.an('array');
            expect(res.body.comments.length).to.equal(13);
            expect(res.body.comments[0]).to.have.keys(
              'comment_id',
              'votes',
              'created_at',
              'author',
              'body'
            );
            expect(res.body.comments[0].comment_id).to.equal(2);
          });
      });
      it('GET status:404 for article number that doesnt exist', () => {
        return request
          .get('/api/articles/1000/comments')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('no article found for article_id 1000');
          });
      });
      it('GET status:200 should return an empty array if the article exists but has no comments', () => {
        return request
          .get('/api/articles/2/comments')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments.length).to.equal(0);
          });
      });
      it('GET status:400 for invalid article id', () => {
        return request
          .get('/api/articles/not-an-article/comments')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              'select "articles"."author", "articles"."title", "articles"."article_id", "articles"."body", "articles"."topic", "articles"."created_at", "articles"."votes", count("comments"."article_id") as "comment_count" from "articles" left join "comments" on "articles"."article_id" = "comments"."article_id" where "articles"."article_id" = $1 group by "articles"."article_id" limit $2 - invalid input syntax for integer: "not-an-article"'
            );
          });
      });
      it('GET status:200 should allow sort_by query', () => {
        return request
          .get('/api/articles/1/comments?sort_by=author')
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.be.an('array');
            expect(res.body.comments.length).to.equal(13);
            expect(res.body.comments[0].author).to.equal('icellusedkars');
          });
      });
      it('GET status:400 when passed an invalid sort_by query', () => {
        return request
          .get('/api/articles/1/comments?sort_by=not-a-column')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              'select "comment_id", "votes", "created_at", "author", "body" from "comments" where "article_id" = $1 order by "not-a-column" desc - column "not-a-column" does not exist'
            );
          });
      });
      it('GET status:200 should allow order query', () => {
        return request
          .get('/api/articles/1/comments?sort_by=author&order=asc')
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.be.an('array');
            expect(res.body.comments.length).to.equal(13);
            expect(res.body.comments[0].author).to.equal('butter_bridge');
          });
      });
      it('POST status:201 returns the posted comment as an object', () => {
        return request
          .post('/api/articles/1/comments')
          .send({ username: 'icellusedkars', body: 'comment body' })
          .expect(201)
          .then(res => {
            expect(res.body.comment).to.have.keys(
              'comment_id',
              'author',
              'article_id',
              'votes',
              'created_at',
              'body'
            );
          })
          .then(() => {
            return request
              .get('/api/articles/1/comments')
              .expect(200)
              .then(res => {
                expect(res.body.comments[0].body).to.equal('comment body');
              });
          });
      });
      it('POST status:404 when article doesnt exist', () => {
        return request
          .post('/api/articles/1000/comments')
          .send({ username: 'icellusedkars', body: 'comment body' })
          .expect(404);
      });
      it('POST status:400 when article id invalid', () => {
        return request
          .post('/api/articles/not-an-article/comments')
          .send({ username: 'icellusedkars', body: 'comment body' })
          .expect(400);
      });
      it('POST status:400 when body contains unused username', () => {
        return request
          .post('/api/articles/not-an-article/comments')
          .send({ username: 'not-a-user', body: 'comment body' })
          .expect(400);
      });
      it('POST status:400 when no username specified', () => {
        return request
          .post('/api/articles/not-an-article/comments')
          .send({ body: 'comment body' })
          .expect(400);
      });
      it('POST status:400 when no comment body specified', () => {
        return request
          .post('/api/articles/not-an-article/comments')
          .send({ username: 'icellusedkars' })
          .expect(400);
      });
      it('POST status:201 returns the posted comment as an object when unused information is provided in the body', () => {
        return request
          .post('/api/articles/1/comments')
          .send({
            username: 'icellusedkars',
            body: 'comment body',
            extraKey: 'extra info'
          })
          .expect(201)
          .then(res => {
            expect(res.body.comment).to.have.keys(
              'comment_id',
              'author',
              'article_id',
              'votes',
              'created_at',
              'body'
            );
          })
          .then(() => {
            return request
              .get('/api/articles/1/comments')
              .expect(200)
              .then(res => {
                expect(res.body.comments[0].body).to.equal('comment body');
              });
          });
      });
      it('invalid method status:405', () => {
        return request
          .put('/api/articles/1/comments')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
    });
    describe('/comments/:comment_id', () => {
      it('PATCH status:200 responds with updated comment, updated votes with positive number', () => {
        return request
          .patch('/api/comments/1')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(res => {
            expect(res.body.comment).to.have.keys(
              'comment_id',
              'author',
              'article_id',
              'votes',
              'created_at',
              'body'
            );
            expect(res.body.comment.votes).to.equal(17);
          });
      });
      it('PATCH status:200 responds with updated comment, updates votes with negative number', () => {
        return request
          .patch('/api/comments/1')
          .send({ inc_votes: -10 })
          .expect(200)
          .then(res => {
            expect(res.body.comment.votes).to.equal(6);
          });
      });
      it('PATCH status:400 for comment with invalid id', () => {
        return request
          .patch('/api/comments/invalid-id')
          .send({ inc_votes: 1 })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              'select * from "comments" where "comment_id" = $1 limit $2 - invalid input syntax for integer: "invalid-id"'
            );
          });
      });
      it('PATCH status:404 for comment that doesnt exist', () => {
        return request
          .patch('/api/comments/1000')
          .send({ inc_votes: 1 })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('Comment 1000 not found');
          });
      });
      it('DELETE status:204 will remove specified comment', () => {
        return request
          .delete('/api/comments/1')
          .expect(204)
          .then(res => {
            expect(res.body).to.eql({});
          })
          .then(() => {
            return request
              .get('/api/comments/1')
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.equal(
                  'no comment found for comment_id 1'
                );
              });
          });
      });
      it('DELETE status:404 for comment that doesnt exist', () => {
        return request
          .delete('/api/comments/1000')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('Comment 1000 not found');
          });
      });
      it('DELETE status:400 for invalid comment id', () => {
        return request.delete('/api/comments/not-a-comment').expect(400);
      });
      it('invalid method status:405', () => {
        return request
          .put('/api/comments/1')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
    });
    describe('/users/:username', () => {
      it('GET status:200 should serve up a username object', () => {
        return request
          .get('/api/users/icellusedkars')
          .expect(200)
          .then(res => {
            expect(res.body.user).to.have.keys(
              'username',
              'avatar_url',
              'name'
            );
            expect(res.body.user.name).to.equal('sam');
          });
      });
      it('GET status:404 for username that doesnt exist', () => {
        return request
          .get('/api/users/not-a-username')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('User not-a-username does not exist');
          });
      });
      it('invalid method status:405', () => {
        return request
          .put('/api/users/icellusedkars')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
    });
    describe('/non-existent-route', () => {
      it('status:404 for route that doesnt exist', () => {
        return request
          .get('/non-existent-route')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('Route Not Found');
          });
      });
    });
  });
});
