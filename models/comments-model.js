const connection = require("../db/connection");

exports.patchCommentById = (id, newVotes) => {
  if (!/[0-9]+/g.test(id)) return Promise.reject({ status: 400, msg: "Invalid Id" });
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", id)
    .returning("*")
    .then(comment => {
      if (comment.length > 0) {
        if (Object.keys(newVotes).length > 0) {
          const totalVotes = comment[0].votes + newVotes.inc_votes;
          return connection("comments")
          .where("comment_id", id)
          .update("votes", totalVotes)
          .returning("*");
        }
        else return comment
      }
      else return Promise.reject({status: 404, msg : "Comment Not Found"});
    });
};

exports.deleteCommentById = id => {
  return connection("comments")
    .where("comment_id", id)
    .del().then((rowsDeleted) => {
      if (rowsDeleted === 0) {
        return Promise.reject({
          status: 404,
          msg: "Resource to delete not found",
        });
      }
      return rowsDeleted;
    }) 
};
