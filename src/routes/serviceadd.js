
const express = require('express');
const router = express.Router();
const applyLeavesDataController = require('../controllers/applyLeavesDataController');
const applyAllowanceController = require('../controllers/ApplyAllowanceController');
 
const authMiddleware = require('../middleware/authMiddleware');

router.post('/applyleaves',authMiddleware ,applyLeavesDataController.addLeaveData);
router.get('/leavedetails', authMiddleware, applyLeavesDataController.getLeaveDetails);
router.post('/applyallowanceadd',authMiddleware, applyAllowanceController.addApplyAllowance);
// Add other routes as needed

module.exports = router;
