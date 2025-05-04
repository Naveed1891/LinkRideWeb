import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
  return (
    <motion.header
      className="bg-primary text-white shadow-md p-4"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">LinkRide</Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/register" className="hover:underline">Register</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </nav>
      </div>
    </motion.header>
  );
}

export default Header;