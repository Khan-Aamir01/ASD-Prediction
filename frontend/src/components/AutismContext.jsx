import React, { createContext, useState } from "react";

// Create context
const AutismContext = createContext();

// Provider Component
export const AutismProvider = ({ children }) => {
  const [answers, setAnswers] = useState(Array(10).fill(0)); // Default: 15 'No' answers (0)
  const [probability, setProbability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update answers when the user selects options
  const updateAnswer = (value) => {
    //const newAnswers = [...answers];
    const newAnswers = value;
    setAnswers(newAnswers);
  };

  // Function to send answers to Flask API
  const submitAnswers = async () => {
    setLoading(true);
    setError(null);
    console.log("The answer going to submit " + answers)

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      const data = await response.json();

      if (response.ok) {
        setProbability(data.autism_probability);
      } else {
        setError(data.error || "Something went wrong!");
      }
    } catch (err) {
      setError("Failed to connect to the server!");
    }

    setLoading(false);
  };

  return (
    <AutismContext.Provider
      value={{ answers, updateAnswer, probability, submitAnswers, loading, error }}
    >
      {children}
    </AutismContext.Provider>
  );
};

export default AutismContext;
