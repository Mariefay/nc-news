const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const {send404} = require('./error/index.js')

app.use(express.json());
app.use("/api", apiRouter)
app.use(send404);




module.exports = { app };