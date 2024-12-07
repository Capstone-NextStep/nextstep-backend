const express = require('express');
const userDetailController = require('../controllers/userDetailController');
const verifyFirebaseToken = require('../../middlewares/authMiddleware');
const upload = require('../../middlewares/uploadMiddleware');
const router = express.Router();

// Protected routes - require authentication
// router.get('/', verifyFirebaseToken, userDetailController.setDetailProfile);
router.post('/', verifyFirebaseToken, upload, userDetailController.setDetailProfile);

module.exports = router;