const express = require('express');
const Sport = require('../models/Sport');
const Center = require('../models/Center');
const router = express.Router();

// Get all sports
router.get('/', async (req, res) => {
  try {
    const sports = await Sport.find();
    res.json(sports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new sport and associate it with a center
router.post('/:centerId', async (req, res) => {
  const { name, courts, timeSlots } = req.body;

  try {
    const center = await Center.findById(req.params.centerId);
    
    if (!center) {
      return res.status(404).json({ message: 'Center not found' });
    }

    // Create a new sport and save it to the Sport collection
    const newSport = new Sport({
      name,
      courts,
      timeSlots,
      center: req.params.centerId  // Associate with the center
    });
    
    const savedSport = await newSport.save(); // Save sport to the database

    // Add the new sport's ObjectId to the center's sports array
    center.sports.push(savedSport._id);
    await center.save(); // Save the updated center
    
    res.status(201).json(savedSport); // Respond with the saved sport
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
