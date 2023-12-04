// routes/salaryDescriptionRoutes.js
const express = require('express');
const router = express.Router();
const SalaryDescriptionController = require('../controllers/SalaryDescriptionController');
const auth = require('../middleware/authMiddleware');

// Route to create a salary description
router.post('/create', auth, SalaryDescriptionController.createSalaryDescription);

module.exports = router;
