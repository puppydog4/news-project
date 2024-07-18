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

const checkCommentExists = async (id) => {
  const { rows: commentRows } = await db.query(
    `SELECT comment_id FROM comments WHERE comment_id = $1`,
    [id]
  );

  if (commentRows.length === 0) {
    return Promise.reject({
      status: 404,
      message: `Comment by id: ${id} does not exist`,
    });
  }
  return;
};

const checkUserExists = async (username) => {
  const { rows: userRows } = await db.query(
    `SELECT username FROM users WHERE username = $1`,
    [username]
  );

  if (userRows.length === 0) {
    return Promise.reject({
      status: 404,
      message: `User: ${username} does not exist`,
    });
  }
  return;
};

module.exports = { checkArticleExists, checkCommentExists, checkUserExists };
