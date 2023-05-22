// routes/index.js
const router = require('express').Router();
const championRoutes = require('./championRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');

// Define routes
router.use('/champions', championRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/reactions', reactionRoutes);

module.exports = router;
