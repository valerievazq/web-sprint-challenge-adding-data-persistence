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

router.get("/:id/resources", (req, res, next) => {
  const { id } = req.params;
  project
    .resourcesByProject(id)
    .then((resource) => {
      if (resource.length) {
        res.json(resource);
      } else {
        res
          .status(404)
          .json({ message: "Could not find the requested resource" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get resources" });
    });
});

module.exports = router;
