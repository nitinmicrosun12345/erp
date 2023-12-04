const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  content: {
    type: String,
    required: true, 
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'error', 'success'], 
    default: 'info', // Default type is 'info'
  },
  isRead: {
    type: Boolean,
    default: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
