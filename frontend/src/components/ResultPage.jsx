import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AutismContext from "../components/AutismContext";

export default function Result() {
  const { probability } = useContext(AutismContext);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to view the result.");
      navigate("/login"); // ✅ Redirect to login page
    }
  }, [navigate]);

  // Format the probability as a percentage
  const formattedProbability =
    probability !== null ? (probability * 100).toFixed(2) + "%" : null;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Autism Prediction Result
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        {probability !== null ? (
          <div className="text-center">
            <p className="text-xl">The probability of autism is:</p>
            <p className="text-3xl font-bold text-blue-600">{formattedProbability}</p>
          </div>
        ) : (
          <p className="text-center text-red-500">No prediction available</p>
        )}
      </div>
    </div>
  );
}


