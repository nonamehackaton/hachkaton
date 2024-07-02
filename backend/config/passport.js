const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/User'); // Assurez-vous que le modèle User est correctement configuré

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/google/callback"
},
  async (token, tokenSecret, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
));

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
},
  async (token, tokenSecret, profile, done) => {
    try {
      let user = await User.findOne({ linkedinId: profile.id });
      if (!user) {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          linkedinId: profile.id
        });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;