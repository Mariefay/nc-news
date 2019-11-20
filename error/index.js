exports.sendCustomErrors = (err, req, res, next) => {

  if (err.status) {
    res.status(err.status).send(err);
  } else next(err);
};
exports.handlePsqlErrors = (err, req, res, next) => {

  const psqlBadRequestCodes = ["22P02", "23502", "42703", "23503"];
  if (psqlBadRequestCodes.includes(err.code))
      res.status(400).send({ msg: "Bad Request" });
  else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
