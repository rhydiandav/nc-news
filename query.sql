SELECT articles.*, count(comments.article_id) as number_of_comments
from articles
  left join comments
  on (articles.article_id = comments.article_id)
group by
    articles.article_id;