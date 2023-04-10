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
  
  res.status(201).json(newProject);
  console.log("Project created");
});

//Retrieve Projects
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({}).populate('createdBy');
    if (!projects) {
      res.status(404);
      throw new Error('No projects found');
    }
    res.status(200).json(projects);
  });

  //DeleteProject
  const deleteProject = asyncHandler(async (req, res) => {
    const { _id } = req.body;
  
    // Find project to be deleted
    const project = await Project.findById(_id);
  
    // Check if project exists
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    } else {
      console.log("Project found")
      console.log(_id)
    }
  
    // Remove project from user's project list
    const user = await User.findById(project.createdBy);
    user.projects = user.projects.filter((id) => id.toString() !== project._id.toString());
    await user.save();
  
    // Delete project from database
    await Project.findByIdAndDelete(project._id);
    
    res.status(200).json({ message: 'Project deleted successfully' });
  });


module.exports = {
  createProject,
  getProjects,
  deleteProject
};
