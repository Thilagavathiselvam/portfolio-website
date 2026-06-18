const express = require("express");
const router = express.Router();

const Project = require("../models/Project");

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);

    const savedProject = await project.save();

    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: "Project Deleted Successfully"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;