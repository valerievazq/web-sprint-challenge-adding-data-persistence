// build your `/api/resources` router here
const express = require("express");
const resource = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const resources = await resource.getResources();
    res.json(resources);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res) => {
  const resourceData = req.body;

  resource
    .addResource(resourceData)
    .then((resource) => {
      res.status(201).json(resource);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new resource" });
    });
});

module.exports = router;
