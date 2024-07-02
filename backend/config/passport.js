const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback"
  },
  async (token, tokenSecret, profile, done) => {
    const { id, name, emails } = profile;
    const email = emails[0].value;

    try {
      let user = await User.findOne({ googleId: id });
      if (!user) {
        user = new User({
          googleId: id,
          firstName: name.givenName,
          lastName: name.familyName,
          email: email,
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
    callbackURL: "http://localhost:3001/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
  },
  async (token, tokenSecret, profile, done) => {
    const { id, firstName, lastName, emailAddress } = profile;

    try {
      let user = await User.findOne({ linkedinId: id });
      if (!user) {
        user = new User({
          linkedinId: id,
          firstName: firstName.localized.en_US,
          lastName: lastName.localized.en_US,
          email: emailAddress,
        });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
));
