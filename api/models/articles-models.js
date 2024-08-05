const db = require("../../db/connection");
const { checkArticleExists } = require("../utils/apiUtils");
exports.fetchArticles = async (
  sortByQuery = "created_at",
  orderQuery = "desc",
  topicQuery
) => {
  const allowedSortBy = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];
  const allowedTopics = [];
  const allowedOrders = ["asc", "desc"];
  const { rows: topicRows } = await db.query("SELECT slug FROM topics;");
  topicRows.forEach((topic) => allowedTopics.push(Object.values(topic)[0]));
  let arrayQuery = [];
  let queryString = `SELECT 
  articles.author, 
  articles.title, 
  articles.article_id, 
  articles.topic, 
  articles.body,
  articles.created_at, 
  articles.votes, 
  articles.article_img_url, 
  COUNT(comments.article_id) AS comment_count
FROM 
  articles
LEFT JOIN 
  comments 
ON 
  articles.article_id = comments.article_id`;
  if (
    !allowedSortBy.includes(sortByQuery) ||
    !allowedOrders.includes(orderQuery) ||
    (!allowedTopics.includes(topicQuery) && topicQuery !== undefined)
  ) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }
  if (topicQuery) {
    arrayQuery.push(topicQuery);
    queryString += ` WHERE topic = $1`;
  }
  queryString += `
  GROUP BY 
    articles.article_id
  ORDER BY ${sortByQuery} ${orderQuery};`;
  const { rows } = await db.query(queryString, arrayQuery);
  return rows;
};
exports.fetchArticleById = async (id) => {
  const { rows } = await db.query(
    `SELECT 
      articles.title, 
      articles.topic, 
      articles.author, 
      articles.body, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url,
      COUNT(comments.article_id) AS comment_count  
  FROM 
      articles 
  LEFT JOIN 
      comments 
  ON 
      articles.article_id = comments.article_id
  WHERE 
      articles.article_id = $1
  GROUP BY 
      articles.article_id
`,
    [id]
  );
  await checkArticleExists(id);
  return rows;
};

exports.editArticleById = async (votes, id) => {
  await checkArticleExists(id);
  if (votes === undefined) {
    return Promise.reject({
      status: 400,
      message: `inc_votes is absent`,
    });
  }
  const { rows } = await db.query(
    "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
    [votes, id]
  );
  return rows[0];
};

exports.createArticle = async (author, title, body, topic, article_img_url) => {
  let arrayArticle = [author, title, body, topic, article_img_url];
  if (
    author === undefined ||
    title === undefined ||
    body === undefined ||
    topic === undefined
  ) {
    return Promise.reject({ status: 400, message: "Field missing" });
  }
  if (article_img_url === undefined) {
    arrayArticle.pop();
    const { rows } = await db.query(
      "INSERT INTO articles (author,title,body,topic) VALUES ($1,$2,$3,$4) RETURNING *",
      arrayArticle
    );
    return rows[0];
  }
  const { rows } = await db.query(
    "INSERT INTO articles (author,title,body,topic,article_img_url) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    arrayArticle
  );
  return rows[0];
};
