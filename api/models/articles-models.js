const db = require("../../db/connection");
exports.fetchArticles = async () => {
  const { rows } = await db.query(`SELECT 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url, 
      COUNT(comments.article_id) AS comment_count
  FROM 
      articles 
  LEFT JOIN 
      comments 
  ON 
      articles.article_id = comments.article_id 
  GROUP BY 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url
  ORDER BY 
      articles.created_at DESC;`);
  return rows;
};
exports.fetchArticleById = async (id, next) => {
  const { rows } = await db.query(
    "SELECT title , topic , author , body , created_at , votes , article_img_url FROM articles WHERE article_id = $1",
    [id]
  );
  if (rows.length === 0) {
    return Promise.reject({
      status: 404,
      message: `Article by id: ${id} does not exist`,
    });
  }
  return rows;
};
