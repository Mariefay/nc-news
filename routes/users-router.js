const usersRouter = require('express').Router();
const { getuserByID } = require("../controllers/users-controller");


usersRouter.get("/:username", getuserByID )

module.exports = usersRouter;