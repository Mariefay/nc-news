process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chai = require("chai");
const request = require("supertest");
const { app } = require("../app");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/topics", () => {
    it("GET 200 : topics accessed", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          expect(body.topics[0]).to.have.keys(["slug", "description"]);
        });
    });
  });
  describe("/users/:username return user object", () => {
    it("GET 200 : userByUsername accessed", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          expect(body.user).to.have.keys(["username", "avatar_url", "name"]);
        });
    });
    it("GET 404 : route not found", () => {
      return request(app)
        .get("/api/users/marie")
        .expect(404)
        .then(({ body }) => {
          
          expect(body.msg).to.eql("404 Not Found");
        });
    });
  });
  describe("/articles", () => {
    it("GET 200 : articles/:articleid gets us a an article obj", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          expect(body.article).to.have.keys([
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          ]);
        });
    });
    it("PATCH 200 : articles/:id votes have been updated", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          expect(body.article).to.have.keys([
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes"
          ]);
          expect(body.article.votes).to.eql(101);
        });
    });
    it("POST 201 : /:id/comments posts a comment succesfully", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "butter_bridge", body: "hi you" })
        .expect(201)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          expect(body.comments[0]).to.have.keys([
            "comments_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          ]);
          expect(body.comments[0].author).to.equal("butter_bridge");
        });
    });
    it("GET 200 : /:id/comments sends comments successfully", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          expect(body.comments[0]).to.have.keys([
            "comments_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          ]);
        });
    });
    xit("GET 200 : articles/:articleid gets us a an article obj", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          expect(body.articles[0]).to.have.keys([
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          ]);
        });
    });
  });
  describe("/comments", () => {
    it.only("PATCH 200 : increases the votes succesfully given a comment id", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 2 })
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          expect(body.comment).to.have.keys([
            "comments_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          ]);
          expect(body.comment.votes).to.eql(18);
        });
    });
    it("Delete 205 : deletes comment succesfully given a comment id", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204);
    });
  });
});
