// models/ServiceInfoModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceInfoSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  property: [{
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }],
  serviceInfotype: {
    type: String,
    required: true
  },
 
}, { 
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('ServiceInfo', serviceInfoSchema);
