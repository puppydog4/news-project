const express = require("express");
const {
  handleCustomErrors,
  handleServerErrors,
  handleBadRequest,
} = require("./error-handlers");
const apiRouter = require("./routers/api-router");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handleBadRequest);
app.use(handleServerErrors);
module.exports = app;
