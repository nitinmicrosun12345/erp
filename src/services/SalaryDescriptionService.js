// services/SalaryDescriptionService.js
const ApplyLeavesData = require('../models/ApplyLeavesData');
const SalaryDescription = require('../models/SalaryDescriptionModel');
const mongoose = require('mongoose');

const calculateSalary = async (userId, month, year) => {
  try {
    const leaveDetails = await ApplyLeavesData.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          'leaveRequests.fromDate': {
            $gte: new Date(`${year}-${month}-01`),
            $lt: new Date(`${year}-${month + 1}-01`),
          },
        },
      },
      {
        $unwind: '$leaveRequests',
      },
      {
        $group: {
          _id: null,
          totalLeaves: { $sum: 1 },
          halfDayLeaves: { $sum: { $cond: { if: { $eq: ['$leaveRequests.leaveType', 'half-day'] }, then: 1, else: 0 } } },
          fullDayLeaves: { $sum: { $cond: { if: { $eq: ['$leaveRequests.leaveType', 'full-day'] }, then: 1, else: 0 } } },
        },
      },
    ]);

    const { totalLeaves, halfDayLeaves, fullDayLeaves } = leaveDetails[0] || { totalLeaves: 0, halfDayLeaves: 0, fullDayLeaves: 0 };

    // Your logic to calculate grossSalary
    const grossSalary = 0; // Replace with your calculation

    return {
      totalLeaves,
      halfDayLeaves,
      fullDayLeaves,
      grossSalary,
    };
  } catch (error) {
    throw new Error(`Error calculating salary: ${error.message}`);
  }
};

const createSalaryDescription = async (userId, month, year) => {
  try {
    const salaryData = await calculateSalary(userId, month, year);

    const salaryDescription = new SalaryDescription({
      user: mongoose.Types.ObjectId(userId), // Convert userId to ObjectId
      month,
      year,
      ...salaryData,
    });

    await salaryDescription.save();

    return salaryDescription;
  } catch (error) {
    throw new Error(`Error creating salary description: ${error.message}`);
  }
};

module.exports = {
  createSalaryDescription,
};
