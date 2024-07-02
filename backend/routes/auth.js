// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/account-security/login' }),
  function(req, res) {
    res.redirect('/dashboard'); // Redirigez vers la page de tableau de bord ou celle que vous souhaitez
  }
);

router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/account-security/login' }),
  function(req, res) {
    res.redirect('/dashboard'); // Redirigez vers la page de tableau de bord ou celle que vous souhaitez
  }
);

module.exports = router;
