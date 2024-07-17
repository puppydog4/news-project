const db = require("../../db/connection");
const { checkArticleExists } = require("../utils/apiUtils");
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
exports.fetchArticleById = async (id) => {
  const { rows } = await db.query(
    `SELECT 
      articles.title, 
      articles.topic, 
      articles.author, 
      articles.body, 
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
  WHERE 
      articles.article_id = $1
  GROUP BY 
      articles.article_id, 
      articles.title, 
      articles.topic, 
      articles.author, 
      articles.body, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url
  ;
`,
    [id]
  );
  await checkArticleExists(id);
  return rows;
};

exports.editArticleById = async (votes, id) => {
  await checkArticleExists(id);
  if (votes === undefined) {
    return Promise.reject({
      status: 400,
      message: `inc_votes is absent`,
    });
  }
  const { rows } = await db.query(
    "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
    [votes, id]
  );
  return rows[0];
};
