const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clockDataSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  entries: [
    {
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      clockIn: {
        type: Date,
      },
      clockOut: {
        type: Date,
      },
    },
  ],
});

module.exports = mongoose.model('ClockData', clockDataSchema);
