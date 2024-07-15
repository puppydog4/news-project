const {
  fetchArticleById,
  fetchArticles,
} = require("../models/articles-models");
exports.getArticles = async (req, res, next) => {
  try {
    const articles = await fetchArticles(next);
    res.status(200).send({ articles });
  } catch (error) {
    next(error);
  }
};
exports.getArticleById = async (req, res, next) => {
  const { article_id } = req.params;
  try {
    const article = await fetchArticleById(article_id, next);
    res.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};
