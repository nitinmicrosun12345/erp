// models/SalaryDescriptionModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salaryDescriptionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to your User model
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  totalLeaves: {
    type: Number,
    default: 0,
  },
  halfDayLeaves: {
    type: Number,
    default: 0,
  },
  fullDayLeaves: {
    type: Number,
    default: 0,
  },
  grossSalary: {
    type: Number,
    required: true,
  },
}, { 
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('SalaryDescription', salaryDescriptionSchema);
