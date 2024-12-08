const express = require('express');
const roadmapController = require('../controllers/roadmapController');
const verifyFirebaseToken = require('../../middlewares/authMiddleware');

const router = express.Router();

// Protected routes - require authentication
router.get('/', verifyFirebaseToken, roadmapController.getAllRoadmaps);
router.get('/:id', verifyFirebaseToken, roadmapController.getRoadmapById);
router.post('/', verifyFirebaseToken, roadmapController.postRoadmap);
router.put('/set/:id', verifyFirebaseToken, roadmapController.setRoadmap);

module.exports = router;