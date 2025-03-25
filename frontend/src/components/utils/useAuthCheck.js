import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Install using `npm install jwt-decode`

const useAuthCheck = (logoutCallback) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000; // Convert to seconds

          if (decoded.exp < currentTime) {
            // Token expired
            localStorage.removeItem("token");
            alert("Session expired. Please log in again.");
            logoutCallback(); // Trigger logout function
          }
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("token");
          logoutCallback(); // Handle invalid token
        }
      }
    };

    checkAuth(); // Run on mount

    const interval = setInterval(checkAuth, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [logoutCallback]);

};

export default useAuthCheck;
