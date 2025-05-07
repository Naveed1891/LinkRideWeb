import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateRide({ token }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/rides/create/",
        { source, destination, time },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Ride created successfully");
      setSource("");
      setDestination("");
      setTime("");
    } catch (err) {
      toast.error("Failed to create ride");
    }
  };

  return (
    <div className="px-4 py-10 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Create a Ride</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-xl text-base"
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-xl text-base"
        />
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-xl text-base"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition text-base"
        >
          Create Ride
        </button>
      </form>
    </div>
  );
}
