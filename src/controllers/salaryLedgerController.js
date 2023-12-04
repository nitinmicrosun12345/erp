
const SalaryLedgerService = require('../services/salaryLedgerService');


const SalaryLedgerController = {
  async createSalaryLedgerEntry(req, res) {
    try {
      const newEntry = await SalaryLedgerService.createSalaryLedgerEntry(req.body);
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getSalaryLedgerData(req, res) {
    try {
      const userId = "654cc7565c577e22bde4f613"; // Assuming the user ID is available in req.user

      const data = await SalaryLedgerService.getSalaryLedgerDataByUserId(userId);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = SalaryLedgerController;
