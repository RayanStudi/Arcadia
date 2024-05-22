import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact = () => {
  return (
    <div className="container mt-4">
      <h1>Contactez-nous</h1>
      <form>
        <div className="form-group">
          <label for="title">Titre</label>
          <input type="text" className="form-control" id="title" />
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <textarea className="form-control" id="description" rows="3"></textarea>
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <button type="submit" className="btn btn-success mt-3">Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;
