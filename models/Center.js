const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
  location: { type: String, required: true }, // E.g. Delhi, Mumbai
  sports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sport' }] // Reference to Sports
});

module.exports = mongoose.model('Center', centerSchema);
