const { fetchTopics } = require("../models/topics-model");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then(topics => res.status(200).send({ topics: topics }))
    .catch((err)=> console.log(err));
};