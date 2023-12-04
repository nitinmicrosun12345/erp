const ApplyAllowance = require('../models/ApplyAllowanceModel');

async function applyAllowanceService(user_id, service_id, applyData) {
  try {
    const newAllowanceApplication = {
      applyDate: applyData.applyDate,
      amount: applyData.amount,
      description: applyData.description,
    };

    // Update the existing document or create a new one
    const result = await ApplyAllowance.findOneAndUpdate(
      { user_id, service_id },
      {
        $push: { allowanceApplications: newAllowanceApplication },
      },
      { upsert: true, new: true }
    );

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  applyAllowanceService
};
