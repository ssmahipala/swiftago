const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  projects: [projectSchema], // Add projects array to the schema
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
const Project = mongoose.model('Project', projectSchema);

module.exports = {User, Project};
