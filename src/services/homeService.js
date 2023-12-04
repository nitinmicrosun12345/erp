const User = require('../models/userModel');

const id=require('../middleware/authMiddleware');
const ServiceInfo = require('../models/ServiceInfo');
const mongoose = require('mongoose');


const getUserName = async (userId) => {
    try {
        console.log('userId in service:', userId);
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(`Error fetching user details: User not found for ID: ${userId}`);
      }
      return user.name;
    } catch (error) {
      throw new Error(`Error fetching user details: ${error.message}`);
    }
  };
  

module.exports = { getUserName };




const getCompanyServices = async () => {
    try {
      // Query the ServiceInfo model to find services with 'serviceInfotype' as 'company'
      const companyServices = await ServiceInfo.find({ serviceInfotype: 'company' }, 'Name');
  
      // Extract only the 'Name' field from the services and return them
      const serviceNames = companyServices.map(service => service.Name);
  
      return serviceNames;
    } catch (error) {
      throw new Error(`Error fetching company services: ${error.message}`);
    }
  };
  
  module.exports = { getCompanyServices };

module.exports = { getUserName, getCompanyServices};
