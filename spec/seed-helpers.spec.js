process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const { formatArticles, formatComments } = require('../utils/seed-helpers');

describe('formatArticles', () => {
  it('should return an empty array when passed an empty array', () => {
    expect(formatArticles([])).to.eql([]);
  });
  it('array of one article should return array of article with created_at formatted to date', () => {
    const articleInput = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const formattedArticle = formatArticles(articleInput);
    expect(formattedArticle[0].created_at instanceof Date).to.equal(true);
  });
  it('should format created_at property for all objects in an array of multiple', () => {
    const articleInput = require('../db/data/test-data/articles');
    const randomIndex = Math.floor(Math.random() * articleInput.length);
    const formattedArticle = formatArticles(articleInput);
    expect(formattedArticle[randomIndex].created_at instanceof Date).to.equal(
      true
    );
  });
});

describe('formatComments', () => {
  it('should return an empty array when passed an empty array', () => {
    expect(formatComments([])).to.eql([]);
  });
  it('when given an array with one comment and an array containing one article which corresponds to it, should return an array with the comment correctly formatted', () => {
    const commentInput = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const articlesInput = [
      {
        article_id: 9,
        title: "They're not exactly dogs, are they?",
        body: 'Well? Think about it.',
        votes: 0,
        topic: 'mitch',
        author: 'butter_bridge',
        created_at: new Date(533132514171)
      }
    ];
    expect(formatComments(commentInput, articlesInput)[0].author).to.equal(
      'butter_bridge'
    );
    expect(formatComments(commentInput, articlesInput)[0].article_id).to.equal(
      9
    );
    expect(
      formatComments(commentInput, articlesInput)[0].created_at instanceof Date
    ).to.equal(true);
  });
  it('should format comments in an array containing multiple comments', () => {
    const commentsInput = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389
      },
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389
      },
      {
        body:
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'icellusedkars',
        votes: 100,
        created_at: 1448282163389
      }
    ];
    const articlesInput = [
      {
        article_id: 9,
        title: "They're not exactly dogs, are they?",
        body: 'Well? Think about it.',
        votes: 0,
        topic: 'mitch',
        author: 'butter_bridge',
        created_at: new Date(533132514171)
      },
      {
        article_id: 1,
        title: 'Living in the shadow of a great man',
        body: 'I find this existence challenging',
        votes: 100,
        topic: 'mitch',
        author: 'butter_bridge',
        created_at: new Date(1542284514171)
      }
    ];
    const randomIndex = Math.floor(Math.random() * commentsInput.length);
    expect(formatComments(commentsInput, articlesInput).length).to.equal(3);
    expect(
      formatComments(commentsInput, articlesInput)[randomIndex]
    ).to.have.property('article_id');
    expect(
      formatComments(commentsInput, articlesInput)[randomIndex]
    ).to.have.property('author');
    expect(
      formatComments(commentsInput, articlesInput)[randomIndex]
        .created_at instanceof Date
    ).to.equal(true);
  });
});
