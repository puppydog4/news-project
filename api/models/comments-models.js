const db = require("../../db/connection");
const { checkArticleExists, checkCommentExists } = require("../utils/apiUtils");
exports.fetchCommentsByArticleId = async (id) => {
  await checkArticleExists(id);
  const { rows } = await db.query(
    `SELECT comment_id , votes,created_at, author , body , article_id 
    FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
    [id]
  );
  if (rows.length === 0) {
    return Promise.reject({
      status: 200,
      message: `There are no comments for article by id ${id}`,
    });
  }
  return rows;
};

exports.createComment = async (id, author, body) => {
  await checkArticleExists(id);
  if (author === undefined || body === undefined) {
    return Promise.reject({
      status: 400,
      message: `username or body are absent`,
    });
  }
  const { rows } = await db.query(
    `INSERT INTO comments (author, body, article_id) VALUES ($1,$2 , $3) RETURNING *`,
    [author, body, id]
  );
  return rows;
};

exports.removeComment = async (id) => {
  await checkCommentExists(id);
  await db.query(`DELETE FROM comments WHERE comment_id = $1`, [id]);
  return;
};
