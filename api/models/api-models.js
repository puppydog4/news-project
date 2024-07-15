const fs = require("fs/promises");

exports.fetchApiDocs = () => {
  return fs.readFile("./endpoints.json", "utf-8").then((data) => {
    return JSON.parse(data);
  });
};
