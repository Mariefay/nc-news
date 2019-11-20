const {
  fetchArticlesById,
  patchVotesById,
  postCommentById,
  fetchCommentsById,
  fetchAllArticles
} = require("../models/articles-model");

exports.getArticleById = (req, res, next) => {
  const { id } = req.params;
  fetchArticlesById(id)
    .then(article => {
      if (article.length > 0) {
        res.status(200).send({ article: article });
      } else return res.status(404).send({ msg: "Article Not Found" });
    })
    .catch(next);
};

exports.patchVotes = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  if (Object.keys(body).length === 0)
    return res.status(400).send({ msg: "Empty Body" });
  if (Object.keys(body).indexOf("inc_votes") === -1) {
    return res.status(400).send({ msg: "Invalid Body Format" });
  }
  patchVotesById(id, body.inc_votes)
    .then(updatedArticle => {
      if (updatedArticle.length > 0)
        res.status(200).send({ article: updatedArticle[0] });
      else return next({ status: 404, msg: "Article Not Found" });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  if (Object.keys(body).length === 0)
    return res.status(400).send({ msg: "Empty Body" });
  if (
    Object.keys(body).indexOf("username") === -1 ||
    Object.keys(body).indexOf("body") === -1
  ) {
    return res.status(400).send({ msg: "Invalid Body Format" });
  }
  postCommentById(id, body)
    .then(comment => {
      res.status(201).send({ comments: comment });
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
  const { id } = req.params;
  fetchCommentsById(id)
    .then(comments => {
      res.status(200).send({ comments: comments });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order_by, topic, author } = req.query;
  fetchAllArticles(sort_by, order_by, topic, author)
    .then(articles => {
      if(articles.length === 0) return res.status(400).send({status:400, msg:"Author or topic doesn't exist"})
      res.status(200).send({ articles: articles });
    })
    .catch(next);
};
