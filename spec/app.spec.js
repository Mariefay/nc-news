process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chai = require("chai");
const request = require("supertest");
const app  = require("../app");
const connection = require("../db/connection");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

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
    it("GET 404 : route not found", () => {
      return request(app)
        .get("/NotARoute")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Route Not Found");
        });
    });
    it("GET 404 : route not found", () => {
      return request(app)
        .get("/api/NotARoute")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Route Not Found");
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
    it("GET 404 : id doesn't exist", () => {
      return request(app)
        .get("/api/users/marie")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("User Not Found");
        });
    });
    it("GET 400 : invalid id", () => {
      return request(app)
        .get("/api/users/789")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql("Bad Request");
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
          expect(body.article.comment_count).to.eql(13)
        });
    });
    it("GET 200 : articles/:articleid works for articles with no comments", () => {
      return request(app)
        .get("/api/articles/2")
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
          expect(body.article.comment_count).to.eql(0)
        });
    });
    it("GET 404 : id doesn't exist", () => {
      return request(app)
        .get("/api/articles/99999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Article Not Found");
        });
    });
    it("GET 400 : invalid id", () => {
      return request(app)
        .get("/api/articles/notAnId")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql("Bad Request");
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
    it("PATCH 404 : article id doesn't exist", () => {
      return request(app)
        .patch("/api/articles/1000")
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Article Not Found");
        });
    });
    it("PATCH 400 : article id is invalid", () => {
      return request(app)
        .patch("/api/articles/notAnId")
        .send({ inc_votes: 1 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql("Bad Request");
        });
    });
    // xit("PATCH 400 : body is empty", () => {
    //   return request(app)
    //     .patch("/api/articles/1")
    //     .send({})
    //     .expect(400)
    //     .then(({ body }) => {
    //       expect(body.msg).to.eql("Empty Body");
    //     });
    // });
    // xit("PATCH 400 : body is in an invalid format", () => {
    //   return request(app)
    //     .patch("/api/articles/1")
    //     .send({ increments_votes: 1 })
    //     .expect(400)
    //     .then(({ body }) => {
    //       expect(body.msg).to.eql("Invalid Body Format");
    //     });
    // });
    it("PATCH 200 : body is empty, returns same comment", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({})
        .expect(200)
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
          expect(body.article.votes).to.eql(100);
        });
    });
    it("POST 201 : /:id/comments posts a comment succesfully", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "butter_bridge", body: "hi you" })
        .expect(201)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          expect(body.comment[0]).to.have.keys([
            "article_id",
            "comments_id",
            "author",
            "votes",
            "created_at",
            "body"
          ]);
          expect(body.comment[0].author).to.equal("butter_bridge");
        });
    });
    
    it("POST 400 invalid body", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql("Empty Body");
        });
    });
    it("POST 404 invalid body", () => {
      return request(app)
        .post("/api/articles/10000/comments")
        .send({ username: "butter_bridge", body: "hi you" })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Article Not Found");
        });
    });
    it("POST 400 invalid body format", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ user: "butter_bridge", bodyy: "hi you" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql("Invalid Body Format");
        });
    });
    it("POST 400 username doesn't exist", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "marie", body: "hi you" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql("Bad Request");
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
            "votes",
            "created_at",
            "body"
          ]);
          expect(body.comments).to.be.descendingBy("created_at")
        });
    });
    it("GET 200 : /:id/comments sends comments properly sorted", () => {
      return request(app)
        .get("/api/articles/1/comments?order=asc")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          expect(body.comments[0]).to.have.keys([
            "comments_id",
            "author",
            "votes",
            "created_at",
            "body"
          ]);
          expect(body.comments).to.be.ascendingBy("created_at")
        });
    });
    it("GET 400 : invalid id", () => {
      return request(app)
        .get("/api/articles/notAnId/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql("Bad Request");
        });
    });
    it("GET 404 : id doesnt exist", () => {
      return request(app)
        .get("/api/articles/9999/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Article Id doesn't exist");
        });
    });
    it("GET 404 : id doesn't exist", () => {
      return request(app)
        .get("/api/articles/99999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Article Not Found");
        });
    });
    it("GET 200 : articles/:articleid gets us a an article obj", () => {
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
          expect(body.articles).to.be.descendingBy("created_at");
        });
    });
    it("GET 200 : articles/:articleid gets us a an array of obj", () => {
      return request(app)
        .get("/api/articles?sort_by=topic&order=asc")
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
          expect(body.articles).to.be.ascendingBy("topic");
        });
    });
    it("GET 200 : articles/ gets us a an array of articles", () => {
      return request(app)
        .get("/api/articles?topic=mitch&author=butter_bridge")
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
          
          let arr = body.articles;
          arr.forEach(obj => {
            expect(obj.author).to.eql("butter_bridge");
            expect(obj.topic).to.eql("mitch");
          });
        });
    });
    it("GET 404 :author doesn't exist", () => {
      return request(app)
        .get("/api/articles?author=marie")
        .expect(404)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          expect(body.msg).to.eql("Author or topic doesn't exist");
        });
    });
    it("GET 404 :topic doesn't exist", () => {
      return request(app)
        .get("/api/articles?topic=marie")
        .expect(404)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          expect(body.msg).to.eql("Author or topic doesn't exist");
        });
    });
    it("GET 200 : topic exists but no articles", () => {
      return request(app)
        .get("/api/articles?topic=paper")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          expect(body).to.eql({ articles: [] });
        });
    });
    it("GET 200 : topic exists but no articles", () => {
      return request(app)
        .get("/api/articles?author=lurker")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          expect(body).to.eql({ articles: [] });
        });
    });
  });
  describe("/comments", () => {
    it("PATCH 200 : increases the votes succesfully given a comment id", () => {
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
    it("PATCH 404 : comments id doesn't exist", () => {
      return request(app)
        .patch("/api/comments/1000")
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Comment Not Found");
        });
    });
    it("PATCH 400 : article id is invalid", () => {
      return request(app)
        .patch("/api/comments/notAnId")
        .send({ inc_votes: 1 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql("Invalid Id");
        });
    });
    it("PATCH 200 : body is empty, returns same comment", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({})
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).to.have.keys([
            "comments_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          ]);
          expect(body.comment.votes).to.eql(16);
        });
    });
    // it("PATCH 400 : body is in an invalid format", () => {
    //   return request(app)
    //     .patch("/api/comments/1")
    //     .send({ increments_votes: 1 })
    //     .expect(400)
    //     .then(({ body }) => {
    //       expect(body.msg).to.eql("Invalid Body Format");
    //     });
    // });
    it("Delete 205 : deletes comment succesfully given a comment id", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204);
    });
    it("Delete 404 : resource to delete isn't found", () => {
      return request(app)
        .delete("/api/comments/10000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Resource to delete not found");
        });
    });
    it("Delete 404 : resource to delete isn't found", () => {
      return request(app)
        .delete("/api/comments/notAnId")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql("Bad Request");
        });
    });
  });
  describe('INVALID METHODS', () => {
    it('status:405', () => {
      const invalidMethods = ['patch', 'put', 'delete','post'];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)[method]('/api/topics')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('method not allowed');
          });
      });
      return Promise.all(methodPromises);
    });
    it('status:405', () => {
      const invalidMethods = ['patch', 'put', 'delete', 'post'];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)[method]('/api/articles')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('method not allowed');
          });
      });
      return Promise.all(methodPromises);
    });
    it('status:405', () => {
      const invalidMethods = ['put', 'delete', 'post'];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)[method]('/api/articles/1')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('method not allowed');
          });
      });
      return Promise.all(methodPromises);
    });
    it('status:405', () => {
      const invalidMethods = ['patch', 'put', 'delete',];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)[method]('/api/articles/1/comments')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('method not allowed');
          });
      });
      return Promise.all(methodPromises);
    });
    it('status:405', () => {
      const invalidMethods = ['patch', 'put', 'delete','post'];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)[method]('/api/users/sam')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('method not allowed');
          });
      });
      return Promise.all(methodPromises);
    });
    it('status:405', () => {
      const invalidMethods = ['put','post','get'];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)[method]('/api/comments/1')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('method not allowed');
          });
      });
      return Promise.all(methodPromises);
    });
    it('status:405', () => {
      const invalidMethods = ['put','post','get','patch','delete'];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)[method]('/api')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('method not allowed');
          });
      });
      return Promise.all(methodPromises);
    });
  });
});
