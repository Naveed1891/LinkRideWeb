import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaLock, FaUser } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/login/", {
        email,
        password,
      });
      console.log("Login successful:", res.data);
  
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
  
      setError(null);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid email or password.");
      toast.error("Invalid login credentials!");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <motion.div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">Welcome Back to LinkRide 🚘</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input type="email" placeholder="Email" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <motion.p className="text-red-500 text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>{error}</motion.p>}
          <motion.button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 shadow-md" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Login</motion.button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">Don’t have an account? <a href="/register" className="text-purple-600 hover:underline">Register</a></p>
      </motion.div>
    </div>
  );
}
