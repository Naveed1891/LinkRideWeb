import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // adjust path if needed

export default function Dashboard() {
  const { accessToken } = useAuth();
  const [postedRides, setPostedRides] = useState([]);
  const [joinedRides, setJoinedRides] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const posted = await axios.get("/api/rides/posted/", { headers });
      const joined = await axios.get("/api/rides/joined/", { headers });

      setPostedRides(posted.data);
      setJoinedRides(joined.data);
    } catch (err) {
      toast.error("Failed to load dashboard data.");
    }
  };

  const handleCancelRide = async (rideId) => {
    try {
      await axios.delete(`/api/rides/${rideId}/cancel/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      toast.success("Ride canceled successfully.");
      fetchDashboardData();
    } catch (err) {
      toast.error("Failed to cancel the ride.");
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchDashboardData();
    }
  }, [accessToken]);

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Dashboard</h2>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-purple-700">Posted Rides</h3>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          {postedRides.map((ride) => (
            <div key={ride.id} className="p-4 bg-white rounded-2xl shadow-md">
              <p className="text-lg font-medium">{ride.source} → {ride.destination}</p>
              <p className="text-gray-600">{ride.time}</p>
              <button
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
                onClick={() => handleCancelRide(ride.id)}
              >
                Cancel Ride
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-purple-700">Joined Rides</h3>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          {joinedRides.map((ride) => (
            <div key={ride.id} className="p-4 bg-white rounded-2xl shadow-md">
              <p className="text-lg font-medium">{ride.source} → {ride.destination}</p>
              <p className="text-gray-600">{ride.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
