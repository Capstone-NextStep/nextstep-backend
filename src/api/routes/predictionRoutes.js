const express = require('express');
const predictionController = require('../controllers/predictionController');
const verifyFirebaseToken = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/', verifyFirebaseToken, predictionController.getPrediction);

module.exports = router;
