const express = require("express");
const { getTopics } = require("./controllers/topics-controllers");
const {
  handleCustomErrors,
  handleServerErrors,
  handleBadRequest,
} = require("./error-handlers");
const { getApiDocs } = require("./controllers/api-controllers");
const {
  getArticleById,
  getArticles,
  patchArticleById,
} = require("./controllers/articles-controllers");
const {
  postCommentByArticleId,
  getCommentsByArticleById,
} = require("./controllers/comments-controllers");
const app = express();

app.use(express.json());

app.get("/api", getApiDocs);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleById);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.use(handleCustomErrors);
app.use(handleBadRequest);
app.use(handleServerErrors);
module.exports = app;
