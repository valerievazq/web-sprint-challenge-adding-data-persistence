// build your `/api/tasks` router here
const express = require("express");
const task = require("./model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const tasks = await task.getTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res) => {
  const taskData = req.body;
  task
    .addTask(taskData)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new task" });
    });
});

router.post("/projects", (req, res) => {
  const data = req.body;
  task
    .addTaskToProject(data)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to add a new task to the project." });
    });
});

module.exports = router;
