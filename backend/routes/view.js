const express = require('express');
const router = express.Router();
const Freelancer = require('../models/Freelancer');
const Company = require('../models/Company');

// Route pour afficher les freelancers
router.get('/freelancers', async (req, res) => {
  try {
    const freelancers = await Freelancer.find();
    res.json(freelancers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route pour afficher les entreprises
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
