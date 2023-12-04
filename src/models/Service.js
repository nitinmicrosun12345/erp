const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceName: String,
  serviceInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceInfo' 
  },
  auth_key:{
    type: String,
    default:null
  },
  serviceinfoids:[
    {
      type:mongoose.Types.ObjectId
    }
  ]
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
