const commentsRouter = require("express").Router();
const { patchComment, deleteComment } = require("../controllers/comments-controller");
const {send405Error} = require('../error/index')

commentsRouter.route("/:id").patch(patchComment).delete(deleteComment).all(send405Error);

module.exports = commentsRouter;
