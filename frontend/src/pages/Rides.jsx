import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const Rides = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    axios.get("/rides/")
      .then(res => {
        setRides(res.data);
      })
      .catch(err => {
        console.error("Error fetching rides:", err);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Available Rides</h1>
      {rides.length > 0 ? (
        <ul className="space-y-2">
          {rides.map(ride => (
            <li key={ride.id} className="border p-2 rounded shadow">
              <p><strong>Driver:</strong> {ride.driver_name}</p>
              <p><strong>From:</strong> {ride.source} <strong>To:</strong> {ride.destination}</p>
              <p><strong>Time:</strong> {ride.time}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No rides found.</p>
      )}
    </div>
  );
};

export default Rides;
