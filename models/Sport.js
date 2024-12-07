const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  name: { type: String, required: true }, // E.g. Badminton, Tennis
  courts: { type: Number, required: true }, // Number of courts as a single number
  timeSlots: { type: [String], required: true }, // Time slots as an array of strings
  center: { type: mongoose.Schema.Types.ObjectId, ref: 'Center', required: true } // Reference to the center
});

module.exports = mongoose.model('Sport', sportSchema);
