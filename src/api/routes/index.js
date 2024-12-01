const express = require('express');
const router = express.Router();

// Import individual route files
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const roadmapRoutes = require('./roadmapRoutes');
const predictionRoutes = require('./predictionRoutes');

// Use the routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roadmaps', roadmapRoutes);
router.use('/predict', predictionRoutes);

// Export the router
module.exports = router;