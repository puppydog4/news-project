const express = require("express");
const { getTopics } = require("./controllers/topics-controllers");
const { handleCustomErrors, handleServerErrors } = require("./error-handlers");
const app = express();

app.get("/api/topics", getTopics);

app.use(handleCustomErrors);
module.exports = app;
