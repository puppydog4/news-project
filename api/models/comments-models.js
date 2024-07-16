const db = require("../../db/connection");
exports.fetchCommentsByArticleId = async (id) => {
  const { rows } = await db.query(
    `SELECT comment_id , votes,created_at, author , body , article_id 
    FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
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
