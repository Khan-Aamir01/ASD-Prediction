import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthCheck from "../components/utils/useAuthCheck";

export default function Navbar() {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Reference for dropdown

   // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false); // Close dropdown after logout
    window.dispatchEvent(new Event("storage")); // Trigger navbar update
    navigate("/login"); // Redirect to login page
  };

  useAuthCheck(handleLogout);

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen for login state changes
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <nav className="bg-blue-600 p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-white text-2xl font-bold">
        ASD Prediction
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-white focus:outline-none"
      >
        ☰
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-white hover:text-gray-300">Home</Link>
        <Link to="/about" className="text-white hover:text-gray-300">About</Link>
        <Link to="/services" className="text-white hover:text-gray-300">Services</Link>
        <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
      </div>

      {/* User Info or Login/Signup (Desktop) */}
      <div className="relative hidden md:flex space-x-4">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-white font-bold focus:outline-none"
            >
              {user.name}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition">Login</Link>
            <Link to="/signup" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition">Sign Up</Link>
          </>
        )}
      </div>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden flex flex-col bg-blue-700 text-white px-4 py-2 space-y-2">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/about" className="hover:text-gray-300">About</Link>
        <Link to="/services" className="hover:text-gray-300">Services</Link>
        <Link to="/contact" className="hover:text-gray-300">Contact</Link>

        {/* User Info or Login/Signup (Mobile) */}
        {user ? (
          <div className="border-t border-gray-400 pt-2">
            <p className="font-bold">{user.name}</p>
            <Link to="/dashboard" className="block mt-2 hover:text-gray-300">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="w-full text-left mt-2 text-red-500 hover:text-red-400"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="border-t border-gray-400 pt-2 flex flex-col space-y-2">
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition">Login</Link>
            <Link to="/signup" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition">Sign Up</Link>
          </div>
        )}
      </div>
    )}
  </nav>
  );
}




