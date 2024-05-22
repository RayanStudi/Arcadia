const express = require('express');
const router = express.Router();
const Report = require('../models/report');

// Route pour créer un compte rendu
router.post('/', async (req, res) => {
  const { animal, state, food, foodQuantity, comments, veterinarian } = req.body;
  const newReport = new Report({ animal, state, food, foodQuantity, comments, veterinarian });

  try {
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour obtenir tous les comptes rendus
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().populate('animal veterinarian');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
