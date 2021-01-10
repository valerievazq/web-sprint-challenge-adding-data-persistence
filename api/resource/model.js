// build your `Resource` model here
const db = require("../data/dbconfig");

function getResources() {
  return db("resources");
}

function addResource(resource) {
  return db("resources").insert(resource);
}

module.exports = {
  findById,
  getResources,
  addResource,
};
