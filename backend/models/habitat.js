const mongoose = require('mongoose');

const habitatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true }
});

module.exports = mongoose.model('Habitat', habitatSchema);
