const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const allowanceApplicationSchema = new Schema({
  ApplyDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const applyAllowanceSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  service_id: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  entries: [allowanceApplicationSchema] 
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('ApplyAllowance', applyAllowanceSchema);
