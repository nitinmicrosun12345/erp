const ApplyAllowance = require('../models/ApplyAllowanceModel');

async function applyAllowanceService(user_id, service_id, entries) {
  try {
    console.log('Input data:', { user_id, service_id, entries });

    const newAllowanceApplication = {
      ApplyDate: entries.applyDate,
      month: entries.month,
      year: entries.year,
      amount: entries.amount,
      description: entries.description,
    };

    console.log('New entry:', newAllowanceApplication);

    
    const result = await ApplyAllowance.findOneAndUpdate(
      { user_id, service_id },
      {
        $push: { entries: newAllowanceApplication },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('Result:', result);
    return result;
  } catch (error) {
    console.error('Error in applyAllowanceService:', error);
    throw error;
  }
}

module.exports = {
  applyAllowanceService,
};
