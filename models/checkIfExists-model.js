const connection = require("../db/connection");

exports.checkIfExists = (username, topic) => {
    if (username) {
        return connection
        .select("*")
        .from("users")
        .where("username", username).returning("*");
    }
    if (topic){
        return connection
        .select("*")
        .from("topics")
        .where("slug", topic).returning("*"); 
    }
 
};

exports.checkArticleId = id => {
    if (id) {
        return connection
        .select("*")
        .from("articles")
        .where("article_id", id).returning("*");
    }
}
