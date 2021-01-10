// Complete your db configuration using the `environment` variable.
const environment = process.env.NODE_ENV || "development";

const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);
module.exports = db;
