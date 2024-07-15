const db = require("../../db/connection");
exports.fetchArticleById = async (id, next) => {
  return db
    .query(
      "SELECT title , topic , author , body , created_at , votes , article_img_url FROM articles WHERE article_id = $1",
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          message: `Article by id: ${id} does not exist`,
        });
      }
      return rows;
    })
    .catch((error) => {
      next(error);
    });
};
