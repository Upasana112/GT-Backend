const express = require('express');
const Booking = require('../models/Booking');
const Center = require('../models/Center');
const Sport = require('../models/Sport');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Get all bookings with populated references
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('location', 'location') 
      .populate('sport', 'name') 
      .populate('court', 'number') 
      .populate('user', 'username'); // Populate only the 'username' field of User

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  const { location, sport, court, time, user, date } = req.body;

  try {
    // Find the center and sport
    const center = await Center.findById(location);
    const sportEntity = await Sport.findById(sport);

    if (!center || !sportEntity) {
      return res.status(404).json({ message: 'Center or Sport not found' });
    }

    // Fetch all bookings
    const bookings = await Booking.find();

    // Check for existing bookings based on criteria
    const bookingDate = date.split('T')[0]; // Get YYYY-MM-DD format from date

    const existingBooking = bookings.find((booking) => {
      
      return (
        booking.location.toString() === center._id.toString() && // Check location
        booking.sport.toString() === sportEntity._id.toString() && // Check sport
        booking.court === court && // Check court
        booking.time === time && // Check time
        booking.date.toISOString().split('T')[0] === bookingDate // Check date (YYYY-MM-DD)
      );
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Booking already exists for this time slot.' });
    }

    // Create new booking
    const booking = new Booking({
      location: center._id,
      sport: sportEntity._id,
      court,
      time,
      user,
      date,
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  console.log(id,password);
  
  try {
    // Find the booking by ID
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Fetch the user who made the booking
    const user = await User.findById(booking.user);

    if (!user) {
      return res.status(404).json({ message: 'User not found for this booking' });
    }

    // Verify the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.PIN);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password. Deletion not authorized.' });
    }

    // Delete the booking
    await booking.deleteOne();

    res.status(200).json({ message: 'Booking successfully deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
