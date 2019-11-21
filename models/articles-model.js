const connection = require("../db/connection");
const { checkArticleId, checkIfExists } = require("./checkIfExists-model");

exports.fetchArticlesById = id => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .where("articles.article_id", id)
    .groupBy("articles.article_id")
    .count("comment_id as comment_count")
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      } else return articles;
    });
};

exports.patchVotesById = (id, body) => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", id)
    .returning("*")
    .then(article => {
      if (article.length > 0) {
        if (Object.keys(body).length > 0) {
          const totalVotes = article[0].votes + body.inc_votes;
          return connection("articles")
            .where("article_id", id)
            .update("votes", totalVotes)
            .returning("*");
        } else return article;
      } else return Promise.reject({ status: 404, msg: "Article Not Found" });
    });
};

exports.postCommentById = (id, comment) => {
  if (!/[0-9]+/g.test(id))
    return Promise.reject({ status: 400, msg: "Invalid Id" });
  else if (Object.keys(comment).length === 0)
    return Promise.reject({ status: 400, msg: "Empty Body" });
  else if (
    Object.keys(comment).indexOf("username") === -1 ||
    Object.keys(comment).indexOf("body") === -1
  ) {
    return Promise.reject({ status: 400, msg: "Invalid Body Format" });
  } else {
    return connection
      .select("article_id")
      .from("articles")
      .where("article_id", id)
      .returning("*")
      .then(articlesIds => {
        if (articlesIds.length > 0) {
          comment.author = comment.username;
          comment.article_id = id;
          delete comment.username;
          return connection("comments")
            .insert([comment])
            .returning("*");
        } else return Promise.reject({ status: 404, msg: "Article Not Found" });
      });
  }
};

exports.fetchCommentsById = (id, sort_by, order) => {
  const comments = connection
    .select("author", "body", "comment_id", "created_at", "votes")
    .from("comments")
    .where("article_id", id)
    .orderBy(sort_by || "created_at", order || "desc")
    .returning("*");
  return Promise.all([comments, checkArticleId(id)]).then(arr => {
    if (arr[0].length === 0 && arr[1].length === 0)
      return Promise.reject({ status: 404, msg: "Article Id doesn't exist" });
    else return arr[0];
  });
};

exports.fetchAllArticles = (sort_by, order, topic, writer) => {
  const articles = connection
    .select("articles.*")
    .from("articles")
    .count({
      comment_count: "comments.comment_id"
    })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (writer !== "NotAUser") {
        if (topic) query.where({ topic: topic });
        if (writer) query.where({ "articles.author": writer });
      }
    });
  return Promise.all([articles, checkIfExists(writer, topic)]).then((arr) => {
    if (arr[0].length === 0 && arr[1].length === 0) return Promise.reject({ status: 404, msg: "Author or topic doesn't exist" });
    else return arr[0];
  })
};
