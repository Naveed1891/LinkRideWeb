import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Dashboard() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/api/rides/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRides(res.data);
      } catch (err) {
        alert('Failed to fetch rides');
      }
    };
    fetchRides();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Available Rides</h2>
      <ul className="space-y-4">
        {rides.map(ride => (
          <li key={ride.id} className="bg-white p-4 shadow rounded">
            <p><strong>Driver:</strong> {ride.driver}</p>
            <p><strong>From:</strong> {ride.origin} <strong>To:</strong> {ride.destination}</p>
            <p><strong>Time:</strong> {ride.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;