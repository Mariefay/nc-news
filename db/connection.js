const knex = require('knex');
const customConfig = require("../knexfile.js")

const connection = knex(customConfig);

module.exports = connection;