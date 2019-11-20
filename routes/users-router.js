const usersRouter = require('express').Router();
const { getuserByID } = require("../controllers/users-controller");
const {send405Error} = require("../error/index")


usersRouter.get("/:username", getuserByID ).all("/:username", send405Error)

module.exports = usersRouter;