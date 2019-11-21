const connection = require("../db/connection");

exports.fetchUserById = username => {
  return connection
    .select("*")
    .from("users")
    .where("username", username)
    .returning("*")
    .then(user => {
      if (/[A-Za-z_]+[0-9]*/g.test(username) && user.length === 0) {
        return Promise.reject({ status: 404, msg: "User Not Found" });
      }
      else if ((/[A-Za-z_]+[0-9]*/g).test(username) && user.length > 0) {
        return user;
      }
      else return Promise.reject({status : 400, msg : "Bad Request"})
    });
};
