const express = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

router.get('/clockstatus', dashboardController.getClockStatus);
router.get('/salaryledger', dashboardController.getSalaryLedger);
router.get('/salarydescription', dashboardController.getSalaryDescription);
router.get('/workstatus', dashboardController.getWorkStatus);
router.get('/materiallist', dashboardController.getMaterialList);
router.get('/leaves', dashboardController.getLeaves);
router.get('/allowance', dashboardController.getAllowance);
//router.get('/home', dashboardController.getHome);
//router.get('/myleaves', dashboardController.getMyLeaves);
//router.get('/myworkstatus', dashboardController.getMyWorkStatus);
//router.get('/notifications', dashboardController.getNotifications);
router.get('/timezone', dashboardController.getTimeZone);

module.exports = router;
