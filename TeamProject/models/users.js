const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    default: null
  }
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

// Export the Mongoose model
module.exports = mongoose.model('User', userSchema);
