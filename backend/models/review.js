const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  validated: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);
