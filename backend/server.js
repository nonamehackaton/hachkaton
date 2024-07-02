const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
require('dotenv').config();
require('./config/passport');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Middleware
app.use(cors());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
  next();
});

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/users', (req, res, next) => {
  console.log('Request to /api/users', req.method, req.body);
  next();
}, require('./routes/users'));
app.use('/auth', (req, res, next) => {
  console.log('Request to /auth', req.method, req.body);
  next();
}, require('./routes/auth'));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
