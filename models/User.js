const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  PIN: { type: String, required: true }, // Use bcrypt to hash the PIN
  email: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 }, // Default balance is 0
});

module.exports = mongoose.model('User', userSchema);
