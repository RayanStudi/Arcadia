const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// Route pour soumettre un avis
router.post('/submit', async (req, res) => {
  const { pseudo, text } = req.body;
  const newReview = new Review({ pseudo, text, validated: false });

  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour valider un avis
router.put('/validate/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    review.validated = true;
    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour obtenir tous les avis validés
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ validated: true });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
