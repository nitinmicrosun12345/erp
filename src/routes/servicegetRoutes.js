// routes/serviceInfoRoutes.js
const express = require('express');
const router = express.Router();
const serviceInfoController = require('../controllers/servicegetinfo');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/salaryledge', authMiddleware, serviceInfoController.salaryledger);
router.get('/salarydescript',authMiddleware,serviceInfoController.salarydescription);

const SalaryLedgerController = require('../controllers/salaryLedgerController');
router.post('/salaryLedger', SalaryLedgerController.createSalaryLedgerEntry);
router.get('/salaryLedger', authMiddleware,SalaryLedgerController.getSalaryLedgerData);
module.exports = router;