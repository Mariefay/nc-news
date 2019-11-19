const { fetchUserById } = require("../models/users-model");

exports.getuserByID = (req, res, next) => {
  const { username } = req.params;
  fetchUserById(username)
    .then(user => {
      if(user.length > 0)
        return res.status(200).send({ user: user[0] })
      else {
       return next({status : 404, msg : "not here"})
      }
    })
    .catch(next);
};
