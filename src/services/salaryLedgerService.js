// salaryLedgerService.js
const SalaryLedgerData = require('../models/salaryledgerdata');

const SalaryLedgerService = {
  async createSalaryLedgerEntry(data) {
    try {
      const newEntry = await SalaryLedgerData.create(data);
      return newEntry;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getSalaryLedgerDataByUserId(userId) {
    try {
      const data = await SalaryLedgerData.find({ user_id: userId }, 'date month details');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

module.exports = SalaryLedgerService;
