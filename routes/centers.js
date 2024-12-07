const express = require('express');
const Center = require('../models/Center');
const router = express.Router();

// Get all centers
router.get('/', async (req, res) => {
  try {
    const centers = await Center.find().populate('sports');
    res.json(centers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new center
router.post('/', async (req, res) => {
  const { location, sports } = req.body;
  const center = new Center({ location, sports });

  try {
    const savedCenter = await center.save();
    res.status(201).json(savedCenter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
