const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User, Project } = require('../models/userModel');

const createProject = asyncHandler(async (req, res) => {
  const { name, description, createdBy } = req.body;
  
  // Check if user exists
  const user = await User.findById(createdBy);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  // Create new project
  const project = new Project({
    name,
    description,
    createdBy: user._id,
  });
  
  // Save new project to database
  const newProject = await project.save();
  
  // Add new project to user's project list
  user.projects.push(newProject._id);
  await user.save();
  
  res.status(201).json({
    _id: newProject._id,
    projectName: newProject.name,
    projectDescription: newProject.description,
    user: newProject.createdBy,
  });
  console.log("Project created");
});

//Retrieve Projects
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({}).populate('createdBy', 'name');
    if (!projects) {
      res.status(404);
      throw new Error('No projects found');
    }
    res.status(200).json(projects);
  });

module.exports = {
  createProject,
  getProjects
};
