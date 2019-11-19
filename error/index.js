exports.send404 = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: "404 Not Found" })
    }
    else {
        next(err);
    }
}