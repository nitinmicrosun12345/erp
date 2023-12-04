// src/models/workStatusDataModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workStatusEntrySchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  clientname: {
    type: String,
    required: true
  },
  work_type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  module_name: {
    type: String,
    required: true
  },
  working_hour: {
    type: Number,
    required: true
  },
  working_minutes: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'Not Started'],
    required: true
  },
  clockData: {
    type: Schema.Types.ObjectId,
    ref: 'ClockData'
  }
});

const workStatusDataSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  service_id: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  entries: [workStatusEntrySchema]
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('WorkStatusData', workStatusDataSchema);
