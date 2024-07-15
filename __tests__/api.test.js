const request = require("supertest");
const seedData = require("../db/data/test-data/index");
const endpoints = require("../endpoints.json");
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
  it("GET: 200 sends an array of all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({ topics: seedData.topicData });
      });
  });
});

describe("/api", () => {
  it("GET: 200 sends a json representation of all the available endpoints of the api", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endpoints);
      });
  });
});
describe("/api/articles", () => {
  it("GET: 200 send serves an array of all articles with a comment count , ordered by date descending by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((article) =>
          expect(article).toEqual({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          })
        );
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
      });
  });
  describe("/api/articles/:article_id", () => {
    it("GET: 200 sends the article selected by id", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            article: [
              {
                title: "Sony Vaio; or, The Laptop",
                topic: "mitch",
                author: "icellusedkars",
                body: expect.any(String),
                created_at: "2020-10-16T05:03:00.000Z",
                votes: 0,
                article_img_url:
                  "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              },
            ],
          });
        });
    });
    it("GET: 404 sends an error when the article by id does not exist", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Article by id: 9999 does not exist");
        });
    });
    it("GET: 400 sends an error when the id is invalid (not a number)", () => {
      return request(app)
        .get("/api/articles/badrequest")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad Request");
        });
    });
  });
});
