const {
  fetchArticleById,
  fetchArticles,
  editArticleById,
  createArticle,
} = require("../models/articles-models");
exports.getArticles = async (req, res, next) => {
  const allowedQueries = ["sort_by", "order", "topic"];
  if (
    !Object.keys(req.query).every((query) => allowedQueries.includes(query))
  ) {
    next({ status: 400, message: "Invalid Query" });
  }
  const { sort_by, order, topic } = req.query;
  try {
    const articles = await fetchArticles(sort_by, order, topic);
    res.status(200).send({ articles });
  } catch (error) {
    next(error);
  }
};
exports.getArticleById = async (req, res, next) => {
  const { article_id } = req.params;
  try {
    const article = await fetchArticleById(article_id);
    res.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};
exports.patchArticleById = async (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  try {
    const article = await editArticleById(inc_votes, article_id);
    res.status(200).send(article);
  } catch (error) {
    next(error);
  }
};

exports.postArticle = async (req, res, next) => {
  const { author, title, body, topic, article_img_url } = req.body;
  try {
    const article = await createArticle(
      author,
      title,
      body,
      topic,
      article_img_url
    );
    res.status(201).send(article);
  } catch (error) {
    next(error);
  }
};
