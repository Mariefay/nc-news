const connection = require("../db/connection");

exports.fetchArticlesById = id => {
  return connection
    .select("*")
    .from("comments")
    .where("article_id", id)
    .returning("*")
    .then(comments => {
      const commentCounts = comments.length;
      const article = connection
        .select("*")
        .from("articles")
        .where("article_id", id)
        .returning("*");
      return Promise.all([article, commentCounts]);
    })
    .then(arr => {
      if (arr[1] !== 0) {
        const article = arr[0][0];
        article.comment_count = arr[1];
        return arr[0];
      } else return [];
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
        const totalVotes = article[0].votes + body;
        return connection("articles")
          .where("article_id", id)
          .update("votes", totalVotes)
          .returning("*");
      } else return article;
    });
};

exports.postCommentById = (id, comment) => {
  comment.author = comment.username;
  comment.article_id = id;
  delete comment.username;
  return connection("comments")
    .insert([comment])
    .returning("*");
};

exports.fetchCommentsById = id => {
  return connection
    .select("*")
    .from("comments")
    .where("article_id", id);
};

exports.fetchAllArticles = (sort_by, order_by, topic, writer) => {
  return connection
    .select("articles.*")
    .from("articles")
    .count({
      comment_count: "comments.comments_id"
    })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order_by || "desc")
    .modify((query) => {
      if (topic) query.where({ topic: topic });
      if(writer) query.where({"articles.author" : writer})
    });
};
