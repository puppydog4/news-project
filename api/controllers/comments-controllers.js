const {
  fetchCommentsByArticleId,
  createComment,
  removeComment,
  editCommentById,
} = require("../models/comments-models");

exports.getCommentsByArticleById = async (req, res, next) => {
  const { article_id } = req.params;
  try {
    const comments = await fetchCommentsByArticleId(article_id);
    res.status(200).send({ comments });
  } catch (error) {
    next(error);
  }
};

exports.postCommentByArticleId = async (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;
  try {
    const comment = await createComment(article_id, username, body);
    res.status(201).send({ comment });
  } catch (error) {
    next(error);
  }
};

exports.deleteCommentById = async (req, res, next) => {
  const { comment_id } = req.params;
  try {
    await removeComment(comment_id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.patchCommentById = async (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  try {
    const comment = await editCommentById(inc_votes, comment_id);
    res.status(200).send(comment);
  } catch (error) {
    next(error);
  }
};
