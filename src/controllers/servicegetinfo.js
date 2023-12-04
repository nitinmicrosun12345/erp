// controllers/servicegetinfo.js
const ServiceInfo = require('../models/ServiceInfo');
const User = require('../models/userModel'); 
const salaryledger = async (req, res) => {
  try {
    const userId = req.user._id; 
    console.log("controller id", userId);


    const data = await ServiceInfo.findOne({ Name: "Salary ledger", "userId": userId });
    if (!data) {
      return res.status(404).json({ message: "Service not found for this user" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const salarydescription = async (req, res) => {
  try {
    const userId = req.user._id; 
    console.log("controller id", userId);

  
    const data = await ServiceInfo.findOne({ Name: "Salary Description", "userId":userId });
    if (!data) {
      return res.status(404).json({ message: "Service not found for this user" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const workstatus = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("controller id", userId);

    const data = await ServiceInfo.findOne({ Name: "Work Status", "userId":userId });
    if (!data) {
      return res.status(404).json({ message: "Service not found for this user" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  salaryledger,
  salarydescription,
  workstatus
};
