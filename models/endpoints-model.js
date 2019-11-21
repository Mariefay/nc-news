const fs = require("fs")

exports.fetchAllEndpoints = (cb) => {
    fs.readFile(__dirname + "/../endpoints.json", (err, JsonResp) => {
        if (err) return(err);
        const data = JSON.parse(JsonResp)
        cb(null, data)
    })
}