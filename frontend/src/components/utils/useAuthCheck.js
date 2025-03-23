import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Install using `npm install jwt-decode`

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode JWT
        const currentTime = Date.now() / 1000; // Get current time in seconds

        if (decoded.exp < currentTime) {
          // Token expired
          localStorage.removeItem("token"); // Remove token
          alert("Session expired. Please log in again.");
          navigate("/login"); // Redirect to login page
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove token if invalid
        navigate("/login");
      }
    }
  }, []); // Runs only once when component mounts
};

export default useAuthCheck;
