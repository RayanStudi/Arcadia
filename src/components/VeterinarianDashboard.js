import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VeterinarianDashboard = ({ user }) => {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({
    animal: '',
    state: '',
    food: '',
    foodQuantity: '',
    comments: ''
  });

  useEffect(() => {
    const fetchReports = async () => {
      const response = await axios.get('http://localhost:3001/reports');
      setReports(response.data);
    };

    fetchReports();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReport({
      ...newReport,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error('User not logged in');
      return;
    }
    try {
      console.log('Submitting report:', { ...newReport, veterinarian: user._id });  // Ajout pour déboguer
      const response = await axios.post('http://localhost:3001/reports', {
        ...newReport,
        veterinarian: user._id
      });
      setReports([...reports, response.data]);
    } catch (error) {
      console.error('Error creating report:', error);
    }
  };

  if (!user) {
    return <p>Veuillez vous connecter pour accéder à cette page.</p>;
  }

  return (
    <div className="container mt-4">
      <h1>Tableau de Bord Vétérinaire</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="animal">Animal :</label>
          <input
            type="text"
            className="form-control"
            id="animal"
            name="animal"
            value={newReport.animal}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">État :</label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={newReport.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="food">Nourriture :</label>
          <input
            type="text"
            className="form-control"
            id="food"
            name="food"
            value={newReport.food}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="foodQuantity">Quantité de Nourriture :</label>
          <input
            type="number"
            className="form-control"
            id="foodQuantity"
            name="foodQuantity"
            value={newReport.foodQuantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Commentaires :</label>
          <textarea
            className="form-control"
            id="comments"
            name="comments"
            value={newReport.comments}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Soumettre</button>
      </form>

      <h2 className="mt-4">Comptes Rendus</h2>
      <ul>
        {reports.map(report => (
          <li key={report._id}>
            <h3>Animal: {report.animal}</h3>
            <p>État: {report.state}</p>
            <p>Nourriture: {report.food}</p>
            <p>Quantité: {report.foodQuantity}</p>
            <p>Commentaires: {report.comments}</p>
            <p>Vétérinaire: {report.veterinarian.email}</p>
            <p>Date: {new Date(report.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VeterinarianDashboard;
