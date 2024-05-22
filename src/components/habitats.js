import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Habitats = () => {
  const [habitats, setHabitats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabitats = async () => {
      try {
        const response = await axios.get('http://localhost:3001/habitats');
        setHabitats(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchHabitats();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Habitats</h1>
      <ul>
        {habitats.map(habitat => (
          <li key={habitat._id}>{habitat.name}: {habitat.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Habitats;
