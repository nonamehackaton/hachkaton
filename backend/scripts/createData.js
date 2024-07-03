const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const connectDB = require('../config/db');

// Import des modèles avec les connexions spécifiques aux bases de données
const Freelancer = require('../models/Freelancer');
const Company = require('../models/Company');

connectDB();

const createData = async () => {
  try {
    // Création de freelances
    const freelancer1 = new Freelancer({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: await bcrypt.hash('password123', 10),
      country: 'France',
      skills: ['JavaScript', 'Node.js'],
      bio: 'Experienced JavaScript developer'
    });

    const freelancer2 = new Freelancer({
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane.smith@example.com',
      password: await bcrypt.hash('password123', 10),
      country: 'Germany',
      skills: ['Python', 'Django'],
      bio: 'Professional Python developer'
    });

    await freelancer1.save();
    await freelancer2.save();

    // Création d'entreprises
    const company1 = new Company({
      name: 'Tech Solutions',
      email: 'contact@techsolutions.com',
      password: await bcrypt.hash('password123', 10),
      country: 'USA',
      description: 'Leading provider of tech solutions'
    });

    const company2 = new Company({
      name: 'Web Innovators',
      email: 'info@webinnovators.com',
      password: await bcrypt.hash('password123', 10),
      country: 'Canada',
      description: 'Innovative web development company'
    });

    await company1.save();
    await company2.save();

    console.log('Data created successfully');
    process.exit();
  } catch (error) {
    console.error('Error creating data: ', error.message);
    process.exit(1);
  }
};

createData();
