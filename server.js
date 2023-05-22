// server.js
const express = require('express');
const connectDB = require('./config/connectDB');

// Import routes
const championRoutes = require('./routes/championrRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');
const reactionRoutes = require('./routes/reactionRoutes');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/champions', championRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/reactions', reactionRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
