const topicsRouter = require('express').Router();
const { getTopics } = require('../controllers/topics-controller')
const {send405Error} = require('../error/index')

topicsRouter.get("/", getTopics).all("/",send405Error);

module.exports = topicsRouter;