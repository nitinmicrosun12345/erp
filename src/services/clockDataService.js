// src/services/clockDataService.js
const ClockData = require('../models/clockDataModel');

async function clockIn(user_id) {
  try {
    const today = new Date().setHours(0, 0, 0, 0);

    // Find the document for today
    const clockData = await ClockData.findOne({ user_id, 'entries.date': today });

    if (clockData) {
      // If the document exists, push a new clock-in entry
      clockData.entries.push({ date: today, clockIn: new Date() });
    } else {
      // If the document doesn't exist, create a new one with a clock-in entry
      await ClockData.create({ user_id, entries: [{ date: today, clockIn: new Date() }] });
    }

    return { message: 'Clock in entry added successfully' };
  } catch (error) {
    console.error('Error in clockIn:', error);
    throw error;
  }
}

async function clockOut(user_id) {
  try {
    const today = new Date().setHours(0, 0, 0, 0);

    // Find the document for today
    const clockData = await ClockData.findOne({ user_id, 'entries.date': today });

    if (clockData) {
      // If the document exists, push a new clock-out entry
      clockData.entries.push({ date: today, clockOut: new Date() });
      await clockData.save();
      return { message: 'Clock out entry added successfully' };
    } else {
      throw new Error('Please submit your work status first');
    }
  } catch (error) {
    console.error('Error in clockOut:', error);
    throw error;
  }
}

module.exports = {
  clockIn,
  clockOut,
};
