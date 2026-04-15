const mongoose = require('mongoose');
require('dotenv').config();

// Option 1: Choose DB by environment variable
const dbURI = process.env.DB_URI || 'mongodb://localhost/testdb';

console.log('Connecting to MongoDB at ' + dbURI);

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed through app termination');
  process.exit(0);
});

module.exports = mongoose;

