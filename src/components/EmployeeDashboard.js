import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDashboard = ({ user }) => {
  const [foodRecords, setFoodRecords] = useState([]);
  const [newFoodRecord, setNewFoodRecord] = useState({
    animal: '',
    food: '',
    grams: '',
    date: ''
  });

  useEffect(() => {
    const fetchFoodRecords = async () => {
      try {
        const response = await axios.get('http://localhost:3001/food-records');
        setFoodRecords(response.data);
      } catch (error) {
        console.error('Error fetching food records:', error);
      }
    };

    fetchFoodRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFoodRecord({
      ...newFoodRecord,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/food-records', newFoodRecord);
      setFoodRecords([...foodRecords, response.data]);
      setNewFoodRecord({
        animal: '',
        food: '',
        grams: '',
        date: ''
      });
    } catch (error) {
      console.error('Error creating food record:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Tableau de Bord Employé</h1>

      <h2>Enregistrer la Nourriture des Animaux</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="animal">Animal :</label>
          <input
            type="text"
            className="form-control"
            id="animal"
            name="animal"
            value={newFoodRecord.animal}
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
            value={newFoodRecord.food}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="grams">Grammage (en grammes) :</label>
          <input
            type="number"
            className="form-control"
            id="grams"
            name="grams"
            value={newFoodRecord.grams}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date :</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={newFoodRecord.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Enregistrer</button>
      </form>

      <h2 className="mt-4">Historique de Nourriture</h2>
      <div className="row">
        {foodRecords.map(record => (
          <div className="col-md-4" key={record._id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Animal : {record.animal}</h5>
                <p className="card-text">Nourriture : {record.food}</p>
                <p className="card-text">Grammage : {record.grams}g</p>
                <p className="card-text">Date : {new Date(record.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
