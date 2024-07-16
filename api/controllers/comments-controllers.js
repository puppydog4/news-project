const { fetchCommentsByArticleId } = require("../models/comments-models");

exports.getCommentByArticleById = async (req, res, next) => {
  const { article_id } = req.params;
  try {
    const comments = await fetchCommentsByArticleId(article_id);
    res.status(200).send({ comments });
  } catch (error) {
    next(error);
  }
};
