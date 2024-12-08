const express = require('express');
const generateController = require('../controllers/generateController');
const verifyFirebaseToken = require('../../middlewares/authMiddleware');

const router = express.Router();

// Protected routes - require authentication
router.get('/:id', verifyFirebaseToken, generateController.getGenerateTemplate);

module.exports = router;