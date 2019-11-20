const {
  fetchArticlesById,
  patchVotesById,
  postCommentById,
  fetchCommentsById,
  fetchAllArticles
} = require("../models/articles-model");
const {checkIfExists } = require("../models/checkIfExists-model");

exports.getArticleById = (req, res, next) => {
  const { id } = req.params;
  fetchArticlesById(id)
    .then(article => {
      if (article.length > 0) {
        res.status(200).send({ article: article[0] });
      } else return next({ status: 404, msg: "Article Not Found" });
    })
    .catch(next);
};

exports.patchVotes = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  // if (Object.keys(body).length === 0)
  //   return res.status(400).send({ msg: "Empty Body" });
  // if (Object.keys(body).indexOf("inc_votes") === -1) {
  //   return res.status(400).send({ msg: "Invalid Body Format" });
  // }
  patchVotesById(id, body)
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
      if (comment.length < 1)
        return next({ status: 404, msg: "Article Not Found" });
      res.status(201).send({ comment: comment });
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
  const { sort_by, order } = req.query;
  const { id } = req.params;
  fetchCommentsById(id, sort_by, order)
    .then(comments => {
      if (comments.length === 0)
        return next({ status: 404, msg: "Article Id doesn't exist" });
      res.status(200).send({ comments: comments });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic, author } = req.query;
  fetchAllArticles(sort_by, order, topic, author)
    .then(articles => {
      if (articles.length === 0) {
        return checkIfExists(author,topic);
      } else return res.status(200).send({ articles: articles });
    })
    .then(things => {
      if (things.length === 0)
        return next({ status: 404, msg: "Author or topic doesn't exist" });
      else return res.status(200).send({ articles: [] });
    })

    .catch(next);
};
