const openai = require('@openai/api');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Project = require('../models/userModel'); // Import the project model

console.log(openai);

const client = new openai({ apiKey: process.env.OPENAI_API_KEY });

async function generateText(projectId, maxTokens, temperature, engine) {
  // Find the project in the database
  const project = await Project.findById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }

  const prompt = `Project name: ${project.name}. Please write a description of the project.`;

  const response = await client.complete({
    prompt,
    maxTokens,
    temperature,
    engine,
  });

  return response.choices[0].text;
}

module.exports = {
  generateText,
};