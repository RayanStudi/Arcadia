import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ user }) => {
  const [habitats, setHabitats] = useState([]);
  const [newHabitat, setNewHabitat] = useState({
    name: '',
    description: ''
  });
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    role: 'employee'
  });
  const [reports, setReports] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    const fetchHabitats = async () => {
      const response = await axios.get('http://localhost:3001/habitats');
      setHabitats(response.data);
    };

    const fetchReports = async () => {
      const response = await axios.get('http://localhost:3001/reports');
      setReports(response.data);
    };

    fetchHabitats();
    fetchReports();
  }, []);

  const handleHabitatChange = (e) => {
    const { name, value } = e.target;
    setNewHabitat({
      ...newHabitat,
      [name]: value
    });
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleHabitatSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newHabitat.name);
    formData.append('description', newHabitat.description);
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }

    try {
      const response = await axios.post('http://localhost:3001/habitats', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setHabitats([...habitats, response.data]);
      setNewHabitat({
        name: '',
        description: ''
      });
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error creating habitat:', error);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users/register', newUser);
      alert(`Utilisateur ${response.data.email} créé avec succès`);
      setNewUser({
        email: '',
        password: '',
        role: 'employee'
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteHabitat = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/habitats/${id}`);
      setHabitats(habitats.filter(habitat => habitat._id !== id));
    } catch (error) {
      console.error('Error deleting habitat:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Dashboard Administrateur</h1>

      <h2>Créer un Nouvel Habitat</h2>
      <form onSubmit={handleHabitatSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={newHabitat.name}
            onChange={handleHabitatChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description :</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={newHabitat.description}
            onChange={handleHabitatChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">Images :</label>
          <input
            type="file"
            className="form-control"
            id="images"
            name="images"
            onChange={handleFileChange}
            multiple
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Créer Habitat</button>
      </form>

      <h2 className="mt-4">Habitats Existants</h2>
      <div className="row">
        {habitats.map(habitat => (
          <div className="col-md-4" key={habitat._id}>
            <div className="card mb-4">
              {habitat.images.length > 0 && <img src={`http://localhost:3001/${habitat.images[0]}`} className="card-img-top" alt={habitat.name} />}
              <div className="card-body">
                <h5 className="card-title">{habitat.name}</h5>
                <p className="card-text">{habitat.description}</p>
                <button className="btn btn-danger" onClick={() => handleDeleteHabitat(habitat._id)}>Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Créer un Nouvel Utilisateur</h2>
      <form onSubmit={handleUserSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleUserChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={newUser.password}
            onChange={handleUserChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Rôle :</label>
          <select
            className="form-control"
            id="role"
            name="role"
            value={newUser.role}
            onChange={handleUserChange}
            required
          >
            <option value="employee">Employé</option>
            <option value="veterinarian">Vétérinaire</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Créer Utilisateur</button>
      </form>

      <h2 className="mt-4">Comptes Rendus des Vétérinaires</h2>
      <div className="row">
        {reports.map(report => (
          <div className="col-md-4" key={report._id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Animal : {report.animal}</h5>
                <p className="card-text">État : {report.status}</p>
                <p className="card-text">Nourriture : {report.food}</p>
                <p className="card-text">Grammage : {report.grams}g</p>
                <p className="card-text">Date : {new Date(report.date).toLocaleDateString()}</p>
                <p className="card-text">Détails : {report.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
