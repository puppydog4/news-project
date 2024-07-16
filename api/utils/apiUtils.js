const db = require("../../db/connection");
const checkArticleExists = async (id) => {
  const { rows: articleRows } = await db.query(
    `SELECT article_id FROM articles WHERE article_id = $1`,
    [id]
  );

  if (articleRows.length === 0) {
    return Promise.reject({
      status: 404,
      message: `Article by id: ${id} does not exist`,
    });
  }
  return;
};

module.exports = { checkArticleExists };
