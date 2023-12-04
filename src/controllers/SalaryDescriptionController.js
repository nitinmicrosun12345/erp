// controllers/SalaryDescriptionController.js
const SalaryDescriptionService = require('../services/SalaryDescriptionService');

const createSalaryDescription = async (req, res) => {
  try {
    const { month, year } = req.body;
    const userId = req.user._id; // Assuming the user ID is available in req.user

    const salaryDescription = await SalaryDescriptionService.createSalaryDescription(userId, month, year);

    res.status(201).json({
      success: true,
      data: salaryDescription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createSalaryDescription,
};
