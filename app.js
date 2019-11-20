const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const {sendCustomErrors, handlePsqlErrors, handleServerErrors, send405Error} = require('./error/index.js')

app.use(express.json());
app.use("/api", apiRouter).all("/api", send405Error)
app.use(sendCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
app.all("/*", (req, res, next) => { res.status(404).send({ msg: 'Route Not Found' })})




module.exports = app ;