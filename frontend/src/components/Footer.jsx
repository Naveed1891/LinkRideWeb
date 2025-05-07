import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-purple-100 text-gray-700 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand & Description */}
        <div>
          <h3 className="text-xl font-bold text-purple-700">LinkRide</h3>
          <p className="mt-2 text-sm">
            Campus ride-sharing made simple and secure. Travel together, smarter.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="font-semibold text-purple-600 mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-purple-500">Home</Link></li>
            <li><Link to="/rides" className="hover:text-purple-500">Rides</Link></li>
            <li><Link to="/create-ride" className="hover:text-purple-500">Create Ride</Link></li>
            <li><Link to="/dashboard" className="hover:text-purple-500">Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-purple-600 mb-2">Connect</h4>
          <ul className="space-y-1">
            <li>Email: the.art.and.the.artist.01@gmail.com</li>
            <li>Phone: +92 311 7327679</li>
            <li><Link to="/contact" className="hover:text-purple-500">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-6 border-t border-purple-200 pt-4 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} LinkRide. All rights reserved.
      </div>
    </footer>
  );
}
