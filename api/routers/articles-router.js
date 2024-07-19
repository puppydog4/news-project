const express = require("express");
const articlesRouter = express.Router();
const {
  getArticles,
  getArticleById,
  patchArticleById,
  postArticle,
} = require("../controllers/articles-controllers");
const {
  postCommentByArticleId,
  getCommentsByArticleById,
} = require("../controllers/comments-controllers");

articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.get("/:article_id/comments", getCommentsByArticleById);
articlesRouter.post("/:article_id/comments", postCommentByArticleId);
articlesRouter.post("/", postArticle);

module.exports = articlesRouter;
