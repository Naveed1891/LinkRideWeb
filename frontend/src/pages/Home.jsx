import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-20 flex flex-col items-center text-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-indigo-700 mb-6">
          Welcome to LinkRide
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-10 max-w-xl sm:max-w-2xl">
          Easily connect with campus students for shared rides. Save money, time, and make new friends on your journey!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-md sm:max-w-none">
          <Link to="/register" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold text-lg shadow hover:bg-indigo-700 transition"
            >
              Get Started
            </motion.button>
          </Link>
          <Link to="/rides" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-indigo-600 text-indigo-600 font-semibold text-lg shadow hover:bg-indigo-100 transition"
            >
              Browse Rides
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-white rounded-2xl shadow-md max-w-4xl mx-auto my-12 px-4 sm:px-8 py-8 text-left"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-4">Why LinkRide?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm sm:text-base">
          <li>🚗 Post or find rides easily on campus.</li>
          <li>🔐 Secure login and role-based access (Driver/Passenger).</li>
          <li>📅 Filter and manage upcoming or joined rides.</li>
          <li>📱 Fully responsive and mobile-friendly design.</li>
        </ul>
      </motion.div>
    </div>
  );
}
