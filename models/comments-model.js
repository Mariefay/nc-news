const connection = require("../db/connection");

exports.patchCommentById = (id, newVotes) => {
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
      else return comment;
    });
};

exports.deleteCommentById = id => {
  return connection("comments")
    .where("comment_id", id)
    .del()
    
};
