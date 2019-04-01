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
        return request.get('/api/articles').expect(200);
      });
    });
  });
});
