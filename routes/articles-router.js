const articlesRouter = require("express").Router();
const { getArticleById, patchVotes, postComment, getComments, getAllArticles } = require("../controllers/articles-controller");
const {send405Error} = require('../error/index')

articlesRouter.get("/", getAllArticles).all("/",send405Error)
articlesRouter.route("/:id").get(getArticleById).patch(patchVotes).all(send405Error)
articlesRouter.route("/:id/comments").post(postComment).get(getComments).all(send405Error);


module.exports = articlesRouter;
