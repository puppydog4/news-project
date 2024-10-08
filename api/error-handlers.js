exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else next(err);
};

exports.handleBadRequest = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23503") {
    res.status(400).send({ message: "Bad Request" });
  } else next(err);
};

exports.handleServerErrors = (err, req, res) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
