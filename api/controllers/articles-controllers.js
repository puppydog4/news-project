const { fetchArticleById } = require("../models/articles-models");

exports.getArticleById = async (req, res, next) => {
  const { article_id } = req.params;
  try {
    const article = await fetchArticleById(article_id, next);
    res.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};
