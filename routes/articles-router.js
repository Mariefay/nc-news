const articlesRouter = require("express").Router();
const { getArticleById, patchVotes, postComment, getComments, getAllArticles } = require("../controllers/articles-controller");

articlesRouter.get("/", getAllArticles)
articlesRouter.route("/:id").get(getArticleById).patch(patchVotes)
articlesRouter.route("/:id/comments").post(postComment).get(getComments);


module.exports = articlesRouter;
