import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AutismContext from "../components/AutismContext";
import { jsPDF } from "jspdf";

export default function Result() {
  const { probability } = useContext(AutismContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to view the result.");
      navigate("/login");
    }

    // Load user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Assuming user data is stored in JSON format
    }
  }, [navigate]);

  // Format probability
  const formattedProbability =
    probability !== null ? (probability * 100).toFixed(2) + "%" : "N/A";

  // Determine Risk Level
  const getRiskLevel = (prob) => {
    if (prob >= 70) return { level: "High Risk", color: "text-red-600" };
    if (prob >= 40) return { level: "Moderate Risk", color: "text-yellow-600" };
    return { level: "Low Risk", color: "text-green-600" };
  };

  const risk = probability !== null ? getRiskLevel(probability * 100) : null;

  // Generate PDF Report
  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.setTextColor(30, 144, 255); // DodgerBlue
    doc.text("Autism Spectrum Disorder Prediction Report", 20, 20);
  
    // Date
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
  
    // User Details
    if (user) {
      doc.setFontSize(14);
      doc.setTextColor(50, 50, 50);
      doc.text("User Information:", 20, 45);
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text(`Name: ${user.name}`, 20, 55);
      doc.text(`Gender: ${user.gender}`, 20, 65);
      doc.text(`Date of Birth: ${user.dob}`, 20, 75);
      doc.text(`Ethnicity: ${user.ethnicity}`, 20, 85);
    }
  
    // How the Model Works
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("How This Prediction Works:", 20, 100);
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Our Autism Spectrum Disorder (ASD) prediction model is based on a questionnaire that consists of 10 key behavioral questions.",
      20,
      110,
      { maxWidth: 170 }
    );
    doc.text(
      "These questions assess social behavior, communication skills, and repetitive actions. The answers are processed using our machine learning model, which calculates a probability score based on patterns found in previous cases.",
      20,
      120,
      { maxWidth: 170 }
    );
    // Probability Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Prediction Result:", 20, 145);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Prediction Probability: ${formattedProbability}`, 20, 155);
  
    // Risk Level - Colorful
    if (risk) {
      doc.setFontSize(14);
      doc.setFont("times", "bold");
      if (risk.level === "High Risk") {
        doc.setTextColor(255, 0, 0); // Red
      } else if (risk.level === "Moderate Risk") {
        doc.setTextColor(255, 165, 0); // Orange
      } else {
        doc.setTextColor(34, 139, 34); // Green
      }
      doc.text(`Risk Level: ${risk.level}`, 20, 165);
    }
  
    // Recommendation
    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(0, 0, 0);
    doc.text("Recommendation:", 20, 180);
    let recommendationText =
      risk?.level === "High Risk"
        ? "Consult a medical professional for further assessment."
        : risk?.level === "Moderate Risk"
        ? "Consider discussing the results with a specialist."
        : "No immediate action required. Stay informed.";
  
    doc.text(recommendationText, 20, 190, { maxWidth: 170 });
  
    // Disclaimer
    doc.setFontSize(10);
    doc.setFont("courier", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(
      "Disclaimer: This result is only a prediction and should not be used as a medical diagnosis.",
      20,
      210,
      { maxWidth: 170 }
    );
  
    // Trademark
    doc.setFontSize(10);
    doc.setFont("helvetica", "bolditalic");
    doc.setTextColor(128, 128, 128);
    doc.text("© 2025 Thousand Sunny. All rights reserved.", 20, 230);
  
    // Save PDF
    doc.save("Autism_Prediction_Report.pdf");
  };
  

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Autism Prediction Result
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        {user && (
          <div className="text-left mb-6">
            <h2 className="text-lg font-bold">User Information:</h2>
            <p>Name: {user.name}</p>
            <p>Gender: {user.gender}</p>
            <p>Date of Birth: {user.dob}</p>
            <p>Ethnicity: {user.ethnicity}</p>
          </div>
        )}

        {probability !== null ? (
          <>
            <p className="text-xl">The probability of autism is:</p>
            <p className={`text-3xl font-bold ${risk.color}`}>
              {formattedProbability}
            </p>
            <p className="text-lg mt-2">Risk Level: <span className={risk.color}>{risk.level}</span></p>

            <button
              onClick={generatePDF}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Download Report
            </button>
          </>
        ) : (
          <p className="text-center text-red-500">No prediction available</p>
        )}
      </div>
    </div>
  );
}




