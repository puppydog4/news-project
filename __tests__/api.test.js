const request = require("supertest");
const seedData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const db = require("../db/connection.js");
const app = require("../api/server");

beforeEach(async () => {
  await seed(seedData);
});

afterAll(async () => {
  await db.end();
});

describe("/api/topics", () => {
  it("GET: 200 sends all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toEqual(seedData.topicData);
      });
  });
});
