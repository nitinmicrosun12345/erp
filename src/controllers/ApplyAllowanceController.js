const { applyAllowanceService } = require('../services/ApplyAllowanceService');

async function addApplyAllowance(req, res) {
  try {
    const { service_id, entries } = req.body;
    const user_id = req.user._id;

    // Validate that required fields are present
    if (!service_id || !entries.applyDate || !entries.month || !entries.year || !entries.amount || !entries.description) {
      return res.status(400).json({ error: 'Missing required fields in the request body' });
    }

    const result = await applyAllowanceService(user_id, service_id, entries);

    console.log('Controller - Result:', result);

    res.json(result);
  } catch (error) {
    console.error('Controller - Error:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  addApplyAllowance
};
