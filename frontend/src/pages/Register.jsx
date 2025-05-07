import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("passenger");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/auth/register/", {
        username,
        email,
        password,
        role,
      });
      toast.success("Registered successfully! Please login.");
      setError(null);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please check your details.");
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <motion.div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">Create Your LinkRide Account</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input type="text" placeholder="Username" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input type="email" placeholder="Email" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <select className="w-full p-3 border border-gray-300 rounded-xl" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
          </select>
          {error && <motion.p className="text-red-500 text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>{error}</motion.p>}
          <motion.button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 shadow-md" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Register</motion.button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">Already have an account? <a href="/login" className="text-purple-600 hover:underline">Login</a></p>
      </motion.div>
    </div>
  );
}
