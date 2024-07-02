const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');

const app = express();

// Connect to database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Configurer la session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// Initialiser Passport
app.use(passport.initialize());
app.use(passport.session());

// Définir les routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
