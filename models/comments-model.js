const connection = require("../db/connection");

exports.patchCommentById = (id, newVotes) => {
  return connection
    .select("*")
    .from("comments")
    .where("comments_id", id)
    .returning("*")
    .then(comment => {
      const totalVotes = comment[0].votes + newVotes.inc_votes;
      return connection("comments")
        .where("comments_id", id)
        .update("votes", totalVotes)
        .returning("*");
    });
};

exports.deleteCommentById = id => {
  return connection("comments")
    .where("comments_id", id)
    .del();
  //     .then(rowsDeleted => {
  //       if (rowsDeleted === 0) {
  //         return Promise.reject({
  //           httpStatus: 404,
  //           responseMessage: "Thing not found"
  //         });
  //       }
  //       return rowsDeleted;
  //     });
};
