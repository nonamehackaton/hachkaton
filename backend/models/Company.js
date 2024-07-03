const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // Add other fields as needed
});

module.exports = (db) => {
  if (!db) {
    throw new Error('Database connection is not defined');
  }
  return db.model('Company', CompanySchema);
};
