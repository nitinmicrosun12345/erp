const ServiceInfo = require('../models/ServiceInfo');
const User = require('../models/userModel');

const dashboardController = {
  getClockStatus: async (req, res) => {
    try {
    
      const currentUser = await User.findOne({  });

      res.json({ currentStatus: currentUser.clockStatus });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getSalaryLedger: async (req, res) => {
    try {
      const salaryLedger = await ServiceInfo.find({  }, 'salaryLedger');
      res.json(salaryLedger);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getSalaryDescription: async (req, res) => {
    try {
      const salaryDescription = await ServiceInfo.find({ }, 'salaryDescription');
      res.json(salaryDescription);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getWorkStatus: async (req, res) => {
    try {
      const workStatus = await ServiceInfo.find({ }, 'workStatus');
      res.json(workStatus);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getMaterialList: async (req, res) => {
    try {
      const materialList = await ServiceInfo.find({ }, 'materialList');
      res.json(materialList);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getLeaves: async (req, res) => {
    try {
      const leaves = await ServiceInfo.find({ }, 'leaves');
      res.json(leaves);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getAllowance: async (req, res) => {
    try {
      const allowance = await ServiceInfo.find({ }, 'allowance');
      res.json(allowance);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },



  getTimeZone: (req, res) => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
      greeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

    res.json({ greeting });
  },
};

module.exports = dashboardController;
