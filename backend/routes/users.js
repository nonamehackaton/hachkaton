const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

const validateUser = [
  check('firstname').not().isEmpty().withMessage('Prénom requis'),
  check('lastname').not().isEmpty().withMessage('Nom de famille requis'),
  check('email').isEmail().withMessage('Merci de fournir une véritable adresse mail'),
  check('password').isLength({ min: 12 }).withMessage('Le mot de passe doit posséder au moins 12 caractères')
];

const validateLogin = [
  check('email').isEmail().withMessage('Merci de fournir une véritable adresse mail'),
  check('password').exists().withMessage('Un mot de passe est requis, tu ne penses pas ? ')
];

router.post('/register', validateUser, (req, res, next) => {
  console.log('POST /register called');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors: ", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, userController.registerUser);

router.post('/login', validateLogin, (req, res, next) => {
  console.log('POST /login called', req.body);  // Log de vérification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors: ", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, userController.loginUser);

module.exports = router;
