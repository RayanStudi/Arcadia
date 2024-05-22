import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Services from './components/services';
import Habitats from './components/habitats';
import Contact from './components/contact';
import Login from './components/login';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import VeterinarianDashboard from './components/VeterinarianDashboard';
import SubmitReview from './components/SubmitReview';
import Header from './components/header';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3001/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/habitats" element={<Habitats />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/admin" element={<AdminDashboard user={user} />} />
            <Route path="/employee" element={<EmployeeDashboard user={user} />} />
            <Route path="/veterinarian" element={<VeterinarianDashboard user={user} />} />
            <Route path="/submit-review" element={<SubmitReview />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
