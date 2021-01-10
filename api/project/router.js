const express = require("express");
const project = require("./model");

const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const projects = await project.getProjects();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res) => {
  const projectData = req.body;
  project
    .addProject(projectData)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "There was an error adding the project" });
    });
});

module.exports = router;
