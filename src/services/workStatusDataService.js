// src/services/workStatusDataService.js
const WorkStatusData = require('../models/workStatusDataModel');

async function addWorkStatusData(user_id, service_id, data) {
  try {
    const workStatusData = new WorkStatusData({
      user_id,
      service_id,
      entries: data.entries
    });

    const savedWorkStatusData = await workStatusData.save();

    return savedWorkStatusData;
  } catch (error) {
    console.error('Error in addWorkStatusData:', error);
    throw error;
  }
}

module.exports = {
  addWorkStatusData,
};
