const express = require('express');
const userController = require('../controllers/userController');
const verifyFirebaseToken = require('../../middlewares/authMiddleware');

const router = express.Router();

// Protected routes - require authentication
router.get('/', verifyFirebaseToken, userController.getAllUsers);
router.get('/:id', verifyFirebaseToken, userController.getUserById);
router.put('/:id', verifyFirebaseToken, userController.updateUser);

module.exports = router;