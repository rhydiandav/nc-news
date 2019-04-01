const formatArticles = articles => {
  return articles.map(articles => {
    articles.created_at = new Date(articles.created_at);
    return articles;
  });
};

const formatComments = (commentsData, articlesData) => {
  if (commentsData.length === 0 || articlesData.length === 0) {
    console.log('ERROR: at least one of the inputs is empty');
    return [];
  }

  return commentsData.reduce((commentsSoFar, currentComment) => {
    const articlesInfo = articlesData.find(article => {
      return article.title === currentComment.belongs_to;
    });
    commentsSoFar.push({
      author: currentComment.created_by,
      article_id: articlesInfo.article_id,
      votes: currentComment.votes,
      created_at: new Date(currentComment.created_at),
      body: currentComment.body
    });
    return commentsSoFar;
  }, []);
};

module.exports = { formatArticles, formatComments };
