
const Service = require('../models/Service');
const ServiceService = require('../services/serviceService');

// Create a new service
exports.createService = async (req, res) => {
  try {
    const serviceData = req.body; // Assuming you send service data in the request body
    const service = await ServiceService.createService(serviceData);
    res.json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
