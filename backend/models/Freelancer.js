const mongoose = require('mongoose');
const { userDB } = require('../config/db');

const FreelancerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  }
});

module.exports = userDB.model('Freelancer', FreelancerSchema);
