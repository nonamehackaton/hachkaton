const express = require('express');
const router = express.Router();
const Freelancer = require('../models/Freelancer');
const Company = require('../models/Company');

// Route pour obtenir les données du tableau de bord des freelancers
router.get('/freelancer/:id', async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id);
    if (!freelancer) {
      return res.status(404).json({ msg: 'Freelancer not found' });
    }
    res.json(freelancer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route pour obtenir les données du tableau de bord des entreprises
router.get('/company/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
