const ServiceInfo = require('../models/ServiceInfo');

// Create a new ServiceInfo
exports.createServiceInfo = async (req,res) => {
  console.log(req.body);
  const serviceInfo = new ServiceInfo(req.body);

  return serviceInfo.save();
};
