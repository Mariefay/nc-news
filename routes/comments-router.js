const commentsRouter = require("express").Router();
const { patchComment, deleteComment } = require("../controllers/comments-controller");

commentsRouter.route("/:id").patch(patchComment).delete(deleteComment);

module.exports = commentsRouter;
