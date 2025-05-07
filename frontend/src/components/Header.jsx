import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ token, role, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/rides", label: "Rides" },
    ...(role === "driver" ? [{ to: "/create-ride", label: "Create Ride" }] : []),
    ...(token ? [{ to: "/dashboard", label: "Dashboard" }] : []),
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-700">
          LinkRide
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              {link.label}
            </Link>
          ))}
          {token ? (
            <button
              onClick={onLogout}
              className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-purple-700 text-2xl"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="md:hidden bg-white px-4 pb-4 flex flex-col gap-4 shadow-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                {link.label}
              </Link>
            ))}
            {token ? (
              <button
                onClick={() => {
                  closeMenu();
                  onLogout();
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
              >
                Login
              </Link>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
