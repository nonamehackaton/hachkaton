const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const userDB = await mongoose.createConnection(process.env.MONGO_URI_USER, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const entrepriseDB = await mongoose.createConnection(process.env.MONGO_URI_ENTREPRISE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to DatabaseUser...');
    console.log('Connected to DatabaseEntreprise...');

    return { userDB, entrepriseDB };
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
