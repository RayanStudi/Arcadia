const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Route pour créer un service
router.post('/create', async (req, res) => {
  const { name, description } = req.body;
  const newService = new Service({ name, description });

  try {
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour obtenir tous les services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
