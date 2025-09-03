// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const staffRoutes = require('./routes/staffRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const statsRoutes = require('./routes/statsRoutes'); 

app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/stats', statsRoutes);

app.use('/api/admins', adminRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
