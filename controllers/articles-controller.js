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
      res.status(200).send({ article: article });
    })
    .catch(next);
};

exports.patchVotes = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  patchVotesById(id, body.inc_votes)
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
  fetchAllArticles()
    .then(articles => {
      res.status(200).send({ articles: articles });
    })
    .catch(next);
};
