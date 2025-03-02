import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">ASD Prediction</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-300">About</Link>
          <Link to="/services" className="text-white hover:text-gray-300">Services</Link>
          <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition">Login</Link>
          <Link to="/signup" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition">Sign Up</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-blue-700 p-4">
          <Link to="/" className="text-white py-2 text-center hover:bg-blue-800 rounded">Home</Link>
          <Link to="/about" className="text-white py-2 text-center hover:bg-blue-800 rounded">About</Link>
          <Link to="/services" className="text-white py-2 text-center hover:bg-blue-800 rounded">Services</Link>
          <Link to="/contact" className="text-white py-2 text-center hover:bg-blue-800 rounded">Contact</Link>
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md mt-2 text-center hover:bg-gray-100">Login</Link>
          <Link to="/signup" className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-2 text-center hover:bg-yellow-600">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}

