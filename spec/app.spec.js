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
            expect(res.body.articles[0].article_id).to.equal(12);
            expect(res.body.articles[0].author).to.equal('butter_bridge');
            expect(res.body.articles[0].comment_count).to.equal('0');
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
      it('GET status:200 should accept query topic, which filters articles by topic', () => {
        return request
          .get('/api/articles?topic=mitch')
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles.length).to.equal(11);
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
      it('GET status:200 should accept query order, which sorts results asc or desc', () => {
        return request
          .get('/api/articles?sort_by=topic&order=asc')
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles[0].topic).to.equal('cats');
          });
      });
    });
    describe('/articles/:article_id', () => {
      it('GET status:200 should accept article id as a parametric endpoint', () => {
        return request
          .get('/api/articles/1')
          .expect(200)
          .then(res => {
            expect(res.body.articles.length).to.equal(1);
          });
      });
    });
  });
});
