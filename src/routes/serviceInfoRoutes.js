
const express = require('express');
const serviceInfoController = require('../controllers/serviceInfoController');
const router = express.Router();

router.post('/serviceinfo', serviceInfoController.createServiceInfo);

module.exports = router;
