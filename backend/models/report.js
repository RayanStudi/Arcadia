const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  animal: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  food: {
    type: String,
    required: true
  },
  foodQuantity: {
    type: Number,
    required: true
  },
  comments: {
    type: String,
    required: false
  },
  veterinarian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);
