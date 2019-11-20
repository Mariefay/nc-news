const {
  patchCommentById,
  deleteCommentById
} = require("../models/comments-model");

exports.patchComment = (req, res, next) => {
  const { body } = req;
  const { id } = req.params;

  if (!/[0-9]+/g.test(id)) return next({ status: 400, msg: "Invalid Id" })
  // if (Object.keys(body).length === 0)
  //   return res.status(400).send({ msg: "Empty Body" });
  // if (Object.keys(body).indexOf("inc_votes") === -1) {
  //   return res.status(400).send({ msg: "Invalid Body Format" });
  // }

  patchCommentById(id, body).then(comment => {
    if (comment.length > 0) res.status(200).send({ comment: comment[0] });
    else return next({status: 404, msg : "Comment Not Found"})
  }).catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { id } = req.params;
  deleteCommentById(id)
    .then((rowsdeleted) => {
      if (rowsdeleted === 0) return next(({ status: 404, msg: "Resource to delete not found" }))
      res.sendStatus(204);
} )
    .catch(next);
};
