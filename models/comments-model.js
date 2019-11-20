const connection = require("../db/connection");

exports.patchCommentById = (id, newVotes) => {
  return connection
    .select("*")
    .from("comments")
    .where("comments_id", id)
    .returning("*")
    .then(comment => {
      if (comment.length > 0) {
        const totalVotes = comment[0].votes + newVotes.inc_votes;
        return connection("comments")
          .where("comments_id", id)
          .update("votes", totalVotes)
          .returning("*");
      }
      else return comment;
    });
};

exports.deleteCommentById = id => {
  return connection("comments")
    .where("comments_id", id)
    .del()
    .then(rowsDeleted => {
      if (rowsDeleted === 0) {
        return Promise.reject({
          status: 404,
          msg: "Resource to delete not found"
        });
      }
      return rowsDeleted;
    });
};
