const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salaryLedgerDataSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  entries: [{
    date: {
      type: Date,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    details: {
      created: {
        type: Number,
        default: 0
      },
      given: {
        type: Number,
        default: 0
      },
      balance: {
        type: Number,
        default: 0
      }
    }
  }]
}, {
  timestamps: true,
  versionKey: false
});


module.exports = mongoose.model('SalaryLedgerData', salaryLedgerDataSchema);
