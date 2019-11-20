const { fetchUserById } = require("../models/users-model");

exports.getuserByID = (req, res, next) => {
  const { username } = req.params;
  fetchUserById(username)
    .then(user => {
      if((/[A-Za-z_]+[0-9]*/g).test(username) && user.length > 0)
        return res.status(200).send({ user: user[0] })
      else if((/[A-Za-z_]+[0-9]*/g).test(username)){
       return next({status : 404, msg : "User Not Found"})
      }
      else return next({status : 400, msg : "Bad Request"})
    })
    .catch(next);
};
