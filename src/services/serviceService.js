const Service = require('../models/Service');

// Create a new service
exports.createService = async (serviceData) => {
  const service = new Service(serviceData);
  return service.save();
};
