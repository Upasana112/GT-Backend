const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { username, PIN, email, balance } = req.body;
    console.log(username, PIN);
  try {
    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the PIN before saving
    const hashedPIN = await bcrypt.hash(PIN, 10); // 10 is the salt rounds
    const user = new User({
      username,
      PIN: hashedPIN, // Save the hashed PIN
      email,
      balance,
    });

    const savedUser = await user.save(); // Save the user to the database
    res.status(201).json(savedUser); // Return the saved user data
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post('/validate-user', async (req, res) => {
    const { username, PIN } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const match = await bcrypt.compare(String(PIN), user.PIN);
    //   const match = user.PIN == PIN;
      if (!match) {
        return res.status(401).json({ message: 'Invalid PIN' });
      }
  
      // If valid, send back the user ID
      return res.status(200).json({ userId: user._id });
    } catch (error) {
      console.error('Error validating user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;
