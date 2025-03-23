import React, { createContext, useState } from "react";

const AutismContext = createContext();

export const AutismProvider = ({ children }) => {
  const [answers, setAnswers] = useState(Array(10).fill("Yes"));
  const [probability, setProbability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update user answers
  const updateAnswer = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    // ✅ Submit only when all 10 answers are filled
    //if(index==9){
    //  submitAnswers(answers);
    //}
  };

  // Function to submit answers and update probability
  const submitAnswers = async (answersData) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Submitting answers:", answersData);
      
      // ✅ 1. Send answers to backend
      const predictResponse = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: answersData }),
      });

      if (!predictResponse.ok) throw new Error("Prediction request failed.");

      const predictData = await predictResponse.json();
      let prob = parseFloat(predictData.prediction);

      if (isNaN(prob)) throw new Error("Invalid probability received.");

      setProbability(prob);
      console.log("Probability received:", prob);

      // ✅ 2. Save result in database (with token)
      const token = localStorage.getItem("token"); // Get token
      if (!token) throw new Error("User not authenticated.");

      const saveResponse = await fetch("http://127.0.0.1:5000/api/users/me/result", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token
        },
        body: JSON.stringify({ result: (prob * 100).toFixed(2) }),
      });

      if (!saveResponse.ok) throw new Error("Failed to save result.");

      console.log("Result saved successfully.");
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <AutismContext.Provider value={{ answers,submitAnswers, updateAnswer, probability, loading, error }}>
      {children}
    </AutismContext.Provider>
  );
};

export default AutismContext;

