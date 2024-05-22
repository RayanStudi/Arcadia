import React, { useState } from 'react';
import axios from 'axios';

const SubmitReview = () => {
  const [pseudo, setPseudo] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/reviews/submit', { pseudo, text });
      setPseudo('');
      setText('');
      alert('Votre avis a été soumis pour validation');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Soumettre un Avis</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            className="form-control"
            id="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Avis</label>
          <textarea
            className="form-control"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Soumettre</button>
      </form>
    </div>
  );
};

export default SubmitReview;
