const {fetchAllEndpoints} = require("../models/endpoints-model")

exports.getAllEndpoints = (req, res, next) => {
    fetchAllEndpoints(((err, endpoints) => {
        if (err) return next(err)
        res.status(200).send({endpoints : endpoints})
    }))
}