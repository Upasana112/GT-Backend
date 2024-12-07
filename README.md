# Backend 

Upasana - IEC2021112
## Overview

This project is a Sports Facility Booking System that allows users to book sports facilities at various centers. It includes functionality for user management, center and sport management, and booking management.

## Prerequisites

- Node.js (v14 or later recommended)
- MongoDB
- express
- npm or yarn

## Setup Instructions

1. Clone the repository:
   ```
   git clone [repository-url]
   cd [project-directory]
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=4040
   ```

4. Start the server:
   ```
   npm start
   ```

## Project Structure

- `config/`: Database configuration
- `models/`: Mongoose models for database schemas
- `routes/`: API route definitions
- `server.js`: Main application file

## API Endpoints

- Centers:
  - GET `/api/centers`: Fetch all centers
  - POST `/api/centers`: Create a new center

- Bookings:
  - GET `/api/bookings`: Fetch all bookings
  - POST `/api/bookings`: Create a new booking
  - DELETE `api/bookings/:id` : Delete an existing booking

- Sports:
  - GET `/api/sports`: Fetch all sports
  - POST `/api/sports/:centerId`: Create a new sport for a specific center

- Users:
  - GET `/api/users`: Fetch all users
  - POST `/api/users`: Create a new user
  - POST `/api/users/validate-user`: Validate user credentials

## Assumptions and Limitations

- The system assumes that each sport has a fixed number of courts and time slots.
- User authentication is implemented using a PIN-based system with bcrypt for hashing.
- The current implementation does not include payment processing.

## Deployed Applications

- Frontend:https://skedular-gt-frontend.vercel.app/
- Backend:https://skedulargt.onrender.com/

## Future Improvements

- Implement a more robust authentication system (e.g. JWT)
- Add payment integration for bookings
- Create a user interface for admin management of centers and sports
- Implement real-time availability updates


