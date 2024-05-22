import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [habitats, setHabitats] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchHabitats = async () => {
      const response = await axios.get('http://localhost:3001/habitats');
      setHabitats(response.data);
    };

    const fetchReviews = async () => {
      const response = await axios.get('http://localhost:3001/reviews');
      setReviews(response.data);
    };

    fetchHabitats();
    fetchReviews();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Bienvenue à Arcadia Zoo</h1>
      <p>Arcadia est un zoo situé en France près de la forêt de Brocéliande, en Bretagne depuis 1960.</p>
      <h2>Nos Habitats</h2>
      <div className="habitats">
        {habitats.map(habitat => (
          <div key={habitat._id}>
            <img src={habitat.image} alt={habitat.name} />
            <h3>{habitat.name}</h3>
          </div>
        ))}
      </div>
      <h2>Avis des Visiteurs</h2>
      <div className="reviews">
        {reviews.map(review => (
          <div key={review._id}>
            <p><strong>{review.pseudo}</strong>: {review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
