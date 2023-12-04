// src/controllers/workStatusDataController.js
const { addWorkStatusData } = require('../services/workStatusDataService');

async function addWorkStatusDataController(req, res) {
  try {
    console.log('req.user:', req.user); // Check the logged user information

    // Extract user_id from req.user
    const user_id = req.user._id;
    console.log('addWorkStatusData - user_id:', user_id); // Add this line to log user_id

    const { service_id } = req.body; // Assuming the request body contains the service_id and other dummy data
    const data = req.body; // Assuming the request body contains the dummy data

    const savedWorkStatusData = await addWorkStatusData(user_id, service_id, data);

    res.json(savedWorkStatusData);
  } catch (error) {
    console.error('Error in addWorkStatusDataController:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addWorkStatusDataController,
};
