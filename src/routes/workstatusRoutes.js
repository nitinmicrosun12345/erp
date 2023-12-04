// src/routes/workstatusRoutes.js
const express = require('express');
const router = express.Router();
// Correct import
const { addWorkStatusDataController } = require('../controllers/workStatusDataController');

const authMiddleware = require('../middleware/authMiddleware');
const { clockInController, clockOutController } = require('../controllers/clockDataController');

router.post('/clockin',authMiddleware, clockInController);
router.post('/clockout',authMiddleware, clockOutController);
router.post('/workstatusadd',authMiddleware, addWorkStatusDataController);

module.exports = router;
