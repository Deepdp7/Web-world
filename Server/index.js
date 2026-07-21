const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Connect to Database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err.message));

const path = require('path');

// Basic route for API check
app.get('/api', (req, res) => {
  res.send('API is up and running!');
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, '../Client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../Client/dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
