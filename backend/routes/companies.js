const express = require('express');
const { check, validationResult } = require('express-validator');
const companyController = require('../controllers/companyController');

module.exports = (entrepriseDB) => {
  const router = express.Router();
  const Company = require('../models/Company')(entrepriseDB);

  const validateCompany = [
    check('name').not().isEmpty().withMessage('Company name is required'),
    check('email').isEmail().withMessage('Please provide a valid email address'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  ];

  // Middleware to attach model to req.db
  router.use((req, res, next) => {
    req.db = { Company };
    next();
  });

  router.post('/register', validateCompany, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors: ", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    await companyController.registerCompany(req, res, next);
  });

  router.post('/login', validateCompany, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors: ", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    await companyController.loginCompany(req, res, next);
  });

  return router;
};
