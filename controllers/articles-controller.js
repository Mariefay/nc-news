const {
  fetchArticlesById,
  patchVotesById,
  postCommentById,
  fetchCommentsById,
  fetchAllArticles
} = require("../models/articles-model");
const {
  checkIfExists,
  checkArticleId
} = require("../models/checkIfExists-model");

exports.getArticleById = (req, res, next) => {
  const { id } = req.params;
  fetchArticlesById(id)
    .then(article => {
      res.status(200).send({ article: article[0] });
    })
    .catch(next);
};

exports.patchVotes = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  patchVotesById(id, body)
    .then(updatedArticle => {
      res.status(200).send({ article: updatedArticle[0] });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  postCommentById(id, body)
    .then(comment => {
      res.status(201).send({ comment: comment[0] });
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
  const { sort_by, order } = req.query;
  const { id } = req.params;
  fetchCommentsById(id, sort_by, order)
    .then(comments => {
      return res.status(200).send({ comments });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic, author } = req.query;
  fetchAllArticles(sort_by, order, topic, author)
    .then(articles => {
      return res.status(200).send({ articles });
    })
    .catch(next);
};
