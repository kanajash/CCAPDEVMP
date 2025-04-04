const express = require("express");
const cors = require("cors");
const app = express();

// Use hardcoded PORT for local, allow override for deployment
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.options("*", cors()); // Enable preflight for all routes
app.use(express.json()); // Parse incoming JSON

// MongoDB config
const dbConfig = require("./db");

// Route imports
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");

// Route registration
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);

// Root route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
