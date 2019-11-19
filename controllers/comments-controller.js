const {
  patchCommentById,
  deleteCommentById
} = require("../models/comments-model");

exports.patchComment = (req, res, next) => {
  const { body } = req;
  const { id } = req.params;
  patchCommentById(id, body).then(comment => {
    res.status(200).send({ comment: comment[0] });
  });
};

exports.deleteComment = (req, res, next) => {
  const { id } = req.params;
  deleteCommentById(id)
    .then(() => res.sendStatus(204))
    .catch(next);
};
