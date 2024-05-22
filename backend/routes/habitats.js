const express = require('express');
const router = express.Router();
const Habitat = require('../models/habitat');

// Récupérer tous les habitats
router.get('/', async (req, res) => {
  try {
    const habitats = await Habitat.find().populate('animals');
    res.json(habitats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
