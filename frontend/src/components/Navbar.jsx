import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-white text-2xl font-bold">ASD Detection</a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-gray-300">Home</a>
          <a href="#" className="text-white hover:text-gray-300">About</a>
          <a href="#" className="text-white hover:text-gray-300">Services</a>
          <a href="#" className="text-white hover:text-gray-300">Contact</a>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100">Login</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">Signup</button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-blue-700 p-4">
          <a href="#" className="text-white py-2">Home</a>
          <a href="#" className="text-white py-2">About</a>
          <a href="#" className="text-white py-2">Services</a>
          <a href="#" className="text-white py-2">Contact</a>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md mt-2">Login</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-2">Signup</button>
        </div>
      )}
    </nav>
  );
}
