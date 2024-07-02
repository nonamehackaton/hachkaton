const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('./config/passport'); 

const app = express();

app.use(session({
    secret: 'nxab<;7tE<x4#Ya3',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');
app.use(authRoutes);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
