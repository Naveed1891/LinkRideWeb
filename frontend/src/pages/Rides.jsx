import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Rides({ token, role }) {
  const [rides, setRides] = useState([]);
  const [destinationFilter, setDestinationFilter] = useState("");

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const res = await axios.get("/api/rides/");
      setRides(res.data);
    } catch (err) {
      toast.error("Failed to fetch rides.");
    }
  };

  const joinRide = async (rideId) => {
    try {
      await axios.post(`/api/rides/${rideId}/join/`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.success("Successfully joined the ride!");
      fetchRides();
    } catch (err) {
      toast.error("Failed to join the ride.");
    }
  };

  const checkInRide = async (rideId) => {
    try {
      await axios.post(`/api/rides/${rideId}/checkin/`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.success("Checked in successfully!");
      fetchRides();
    } catch (err) {
      toast.error("Check-in failed.");
    }
  };

  const checkOutRide = async (rideId) => {
    try {
      await axios.post(`/api/rides/${rideId}/checkout/`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.success("Checked out successfully!");
      fetchRides();
    } catch (err) {
      toast.error("Check-out failed.");
    }
  };

  const filteredRides = rides.filter((ride) =>
    destinationFilter
      ? ride.destination.toLowerCase().includes(destinationFilter.toLowerCase())
      : true
  );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-purple-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Available Rides
        </h2>

        <input
          type="text"
          placeholder="Filter by destination..."
          className="w-full p-3 mb-6 border rounded-xl"
          value={destinationFilter}
          onChange={(e) => setDestinationFilter(e.target.value)}
        />

        <div className="grid gap-6">
          {filteredRides.map((ride) => (
            <div
              key={ride.id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold">
                {ride.source} → {ride.destination}
              </h3>
              <p className="text-sm text-gray-600">Time: {ride.time}</p>
              <p className="text-sm text-gray-600">Driver: {ride.driver_name}</p>
              <p className="text-sm text-gray-600">
                Seats Available: {ride.seats_available}
              </p>
              {token && role === "passenger" && (
                <div className="mt-3 flex gap-3 flex-wrap">
                  <button
                    onClick={() => joinRide(ride.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                  >
                    Join Ride
                  </button>
                  <button
                    onClick={() => checkInRide(ride.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
                  >
                    Check In
                  </button>
                  <button
                    onClick={() => checkOutRide(ride.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                  >
                    Check Out
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
