const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  habitat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habitat'
  },
  age: {
    type: Number,
    required: true
  }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;