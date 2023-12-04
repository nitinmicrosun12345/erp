
const ServiceInfo = require('../models/ServiceInfo');
const ServiceInfoService = require('../services/serviceInfoService');

// Create a new ServiceInfo
exports.createServiceInfo = async (req, res) => {
  try {
    const serviceInfoData = req.body; // Assuming you send serviceInfo data in the request body
    const serviceInfo = await ServiceInfoService.createServiceInfo(req,res);
    res.json(serviceInfo);
  } catch (error) {
    console.error('Error creating ServiceInfo:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
