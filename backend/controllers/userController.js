// backend/controllers/userController.js
const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  console.log("Request received: ", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors: ", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password, country } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      console.log("User already exists: ", user);
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      firstname,
      lastname,
      email,
      password: await bcrypt.hash(password, 10),
      country
    });

    await user.save();
    console.log("User registered: ", user);
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error("Error saving user: ", err.message);
    res.status(500).send('Server error');
  }
};

exports.loginUser = async (req, res) => {
  console.log("Login request received: ", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors: ", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error("Error during login: ", err.message);
    res.status(500).send('Server error');
  }
};
