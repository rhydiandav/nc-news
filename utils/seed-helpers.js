const formatArticles = articlesData => {
  // const testDate = new Date(1542284514171);
  articlesData.forEach(article => {
    article.created_at = new Date(article.created_at);
  });
};

module.exports = { formatArticles };
