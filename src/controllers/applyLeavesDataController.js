// controllers/applyLeavesDataController.js
const ApplyLeavesDataService = require('../services/ApplyLeavesDataService');

// Controller logic for adding leave data
exports.addLeaveData = async (req, res) => {
  try {
    const userId = req.user._id;

    const leaveData = {
      serviceId: req.body.serviceId,
      leaveType: req.body.leaveType,
      firstHalf: req.body.firstHalf,
      secondHalf: req.body.secondHalf,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      reason: req.body.reason,
      status: req.body.status,
    };

    const result = await ApplyLeavesDataService.applyLeave(req, leaveData);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller logic for getting leave details
exports.getLeaveDetails = async (req, res) => {
  try {
    const userId = req.user._id;

    const leaveDetails = await ApplyLeavesDataService.getLeaveDetails(userId);

    res.json(leaveDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
