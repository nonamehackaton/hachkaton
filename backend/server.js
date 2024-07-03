const express = require('express');
const { check, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const companyController = require('../controllers/companyController');
const connectDB = require('../config/database');

const app = express();

app.use(express.json());

app.post('/register', [
  check('firstname').not().isEmpty().withMessage('Prénom requis'),
  check('lastname').not().isEmpty().withMessage('Nom de famille requis'),
  check('email').isEmail().withMessage('Merci de fournir une véritable adresse mail'),
  check('password').isLength({ min: 12 }).withMessage('Le mot de passe doit posséder au moins 12 caractères')
], userController.registerUser);

app.post('/login', [
  check('email').isEmail().withMessage('Merci de fournir une véritable adresse mail'),
  check('password').exists().withMessage('Un mot de passe est requis, tu ne penses pas ? ')
], userController.loginUser);

app.use('/companies', companyController);

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

startServer();


