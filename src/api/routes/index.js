const express = require('express');
const router = express.Router();

// Import individual route files
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const roadmapRoutes = require('./roadmapRoutes');

// Use the routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roadmaps', roadmapRoutes);

// Export the router
module.exports = router;