const express = require('express');
const passport = require('passport');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Initialiser Passport
require('../config/passport');

// Routes d'authentification existantes
router.post('/register', register);
router.post('/login', login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/'); // Redirige vers la page d'accueil après une connexion réussie
  }
);

// LinkedIn OAuth
router.get('/linkedin', passport.authenticate('linkedin'));
router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/'); // Redirige vers la page d'accueil après une connexion réussie
  }
);

module.exports = router;