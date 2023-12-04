// src/controllers/clockDataController.js
const { clockIn, clockOut } = require('../services/clockDataService');

async function clockInController(req, res) {
  try {
    console.log('req.user:', req.user);
    const user_id = req.user._id;
    console.log('ClockIn - user_id:', user_id);

    const result = await clockIn(user_id);

    res.json({ message: result.message });
  } catch (error) {
    console.error('Error in clockInController:', error);
    res.status(500).json({ error: error.message });
  }
}

async function clockOutController(req, res) {
  try {
    console.log('req.user:', req.user);
    const user_id = req.user._id;
    console.log('ClockOut - user_id:', user_id);

    const result = await clockOut(user_id);

    res.json({ message: result.message });
  } catch (error) {
    console.error('Error in clockOutController:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  clockInController,
  clockOutController,
};
