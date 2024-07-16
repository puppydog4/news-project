const { fetchApiDocs } = require("../models/api-models");

exports.getApiDocs = async (req, res) => {
  const docs = await fetchApiDocs();
  res.status(200).send(docs);
};
