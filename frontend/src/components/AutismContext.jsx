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
    //submitAnswers();
    if(index==10){
      submitAnswers();
    }
  };

  // Function to submit answers and update probability
  const submitAnswers = async () => {
    setLoading(true);
    setError(null);
    console.log("Submitting answers:", answers);
  
    try {
      // ✅ 1. Send answers to Flask API for ASD probability prediction
      const predictResponse = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
  
      const predictData = await predictResponse.json();
      if (!predictResponse.ok) throw new Error(predictData.error || "Failed to get prediction.");
  
      // ✅ 2. Get ASD probability
      let prob = parseFloat(predictData.prediction);
      if (isNaN(prob)) throw new Error("Invalid probability value received.");
  
      setProbability(prob); // Update state
      console.log("Probability received:", prob);
  
      // ✅ 3. Store the result in the user database
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated.");
  
      const saveResponse = await fetch("http://127.0.0.1:5000/api/users/me/result", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ result: (prob * 100).toFixed(2) }), // Use `prob`
      });
  
      const saveData = await saveResponse.json();
      if (!saveResponse.ok) throw new Error(saveData.error || "Failed to save result.");
  
      console.log("Result saved successfully in the database:", (prob * 100).toFixed(2));
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    }
  
    setLoading(false);
  };

  return (
    <AutismContext.Provider value={{ answers, updateAnswer, probability, submitAnswers, loading, error }}>
      {children}
    </AutismContext.Provider>
  );
};

export default AutismContext;
