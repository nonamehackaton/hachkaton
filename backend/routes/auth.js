const express = require('express');
const router = express.Router();
const passport = require('passport');

// Route pour Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

// Route pour LinkedIn OAuth
router.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));

router.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;
