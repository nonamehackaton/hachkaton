const Freelancer = require('../models/Freelancer');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.registerFreelancer = async (req, res) => {
  console.log("Request received: ", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors: ", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password, country, skills, bio } = req.body;

  try {
    let freelancer = await Freelancer.findOne({ email });

    if (freelancer) {
      console.log("Freelancer already exists: ", freelancer);
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
    console.log("Freelancer registered: ", freelancer);
    res.status(201).json({ msg: 'Freelancer registered successfully' });
  } catch (err) {
    console.error("Error saving freelancer: ", err.message);
    res.status(500).send('Server error');
  }
};

exports.loginFreelancer = async (req, res) => {
  console.log("Login request received: ", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors: ", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let freelancer = await Freelancer.findOne({ email });

    if (!freelancer) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, freelancer.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: freelancer.id
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error("Error during login: ", err.message);
    res.status(500).send('Server error');
  }
};
