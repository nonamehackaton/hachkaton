const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Freelancer = require('../models/Freelancer');

const validateFreelancer = [
  check('firstname').not().isEmpty().withMessage('Prénom requis'),
  check('lastname').not().isEmpty().withMessage('Nom de famille requis'),
  check('email').isEmail().withMessage('Merci de fournir une véritable adresse mail'),
  check('password').isLength({ min: 12 }).withMessage('Le mot de passes doit posséder au moins 12 caractères')
];

router.post('/create', validateFreelancer, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password, country, skills, bio } = req.body;

  try {
    let freelancer = await Freelancer.findOne({ email });

    if (freelancer) {
      return res.status(400).json({ msg: 'Freelancer already exists' });
    }

    freelancer = new Freelancer({
      firstname,
      lastname,
      email,
      password: await bcrypt.hash(password, 10),
      country,
      skills,
      bio
    });

    await freelancer.save();
    res.status(201).json({ msg: 'Freelancer created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
