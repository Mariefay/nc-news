const { fetchUserById } = require("../models/users-model");

exports.getuserByID = (req, res, next) => {
  const { username } = req.params;
  fetchUserById(username)
    .then(user => {
        return res.status(200).send({ user: user[0] })
    })
    .catch(next);
};
