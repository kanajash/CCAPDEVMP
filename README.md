# Co-Working Space Reservation System

## Overview
Co-working space reservation system that allows users to browse, book, and manage shared workspaces, private offices, and meeting rooms. The system is built using Node.js, Express, and MongoDB.

## Features
- User authentication and management
- Browse and book different types of rooms
- Manage bookings
- Payment integration via Stripe
- RESTful API endpoints

## Installation
### Prerequisites
- Node.js (latest LTS version recommended)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/kanajash/CCAPDEVMP.git
   cd ccapdev
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure the database connection:
   - Edit `db.js` and replace the MongoDB connection string with your own.

4. Start the server:
   ```sh
   nodemon server.js (should be run at appdevmp)
   ```

5. Start the client:
   ```sh
   npm start (should be run at client)
   ```

## Project Structure
```
/
|-- routes/                # API route handlers
|-- models/                # Database schemas/models
|   |-- booking.js         # Booking model
|   |-- room.js            # Room model
|   |-- user.js            # User model
|-- public/                # Static assets (if applicable)
|-- views/                 # Front-end templates (if applicable)
|-- db.js                  # Database connection
|-- server.js              # Main application entry point
|-- package.json           # Project metadata and dependencies
|-- README.md              # Documentation
```

## API Endpoints
### Rooms
- `GET /api/rooms` - Get all available rooms
- `GET /api/rooms/:id` - Get room details
- `POST /api/rooms` - Add a new room (admin only)

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate user

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/user/:userid` - Get bookings for a user


