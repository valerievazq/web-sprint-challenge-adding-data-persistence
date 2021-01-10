const express = require("express");
const helmet = require("helmet");

const projectsRouter = require("./api/project/router");
const resourcesRouter = require("./api/resource/router");
const tasksRouter = require("./api/task/router");

const server = express();
server.use(express.json());

server.use("/api/projects", projectsRouter);
server.use("/api/resources", resourcesRouter);
server.use("/api/tasks", tasksRouter);

server.use("/", (req, res) => {
  res.json({ message: "API is up and running" });
});

module.exports = server;
