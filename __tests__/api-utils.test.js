const seedData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const db = require("../db/connection.js");
const {
  checkArticleExists,
  checkCommentExists,
} = require("../api/utils/apiUtils");

beforeEach(async () => {
  await seed(seedData);
});

afterAll(async () => {
  await db.end();
});

describe("checkArticleExists", () => {
  it("should throw a 404 error if the article does not exist", async () => {
    await expect(checkArticleExists(999)).rejects.toEqual({
      status: 404,
      message: "Article by id: 999 does not exist",
    });
  });
});

describe("checkCommentExists", () => {
  it("should throw a 404 error if the comment does not exist", async () => {
    await expect(checkCommentExists(999)).rejects.toEqual({
      status: 404,
      message: "Comment by id: 999 does not exist",
    });
  });
});
