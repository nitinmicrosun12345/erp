// models/ApplyLeavesDataModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveRequestSchema = new Schema({
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
  },
  leaveType: {
    type: String,
    enum: ['half-day', 'full-day'],
    required: true,
  },
  firstHalf: {
    type: String,
  },
  secondHalf: {
    type: String,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});

const applyLeavesDataSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  totalLeaves: {
    type: Number,
    default: 0,
  },
  leaveRequests: [leaveRequestSchema], // Array to store leave requests
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('ApplyLeavesData', applyLeavesDataSchema);
