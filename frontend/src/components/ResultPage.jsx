import { useEffect, useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AutismContext from "../components/AutismContext";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { submitAnswers, probability, loading, error } = useContext(AutismContext);

  // Get responses from previous page
  const responses = location.state?.responses || {};

  // Convert "Yes"/"No" answers into 1/0 format
  //const answersArray = useMemo(
   // () => Object.values(responses).map((answer) => (answer === "Yes" ? 1 : 0)),
  //  [responses]
  //);

  // Send answers to Flask API when the component mounts
  //useEffect(() => { // Potential Issue Here
   // if (answersArray.length === 10 && submitAnswers) {
   //   submitAnswers(answersArray); 
   // }
  //}, [answersArray, submitAnswers]);

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-bold text-blue-600">Assessment Result</h1>

      {loading && <p className="text-lg text-gray-700">Analyzing responses...</p>}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {probability !== null && (
        <div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">Autism Probability: {probability}%</h2>
          <p className="mt-4 text-lg text-gray-700">
            {probability >= 50
              ? "High possibility of Autism Spectrum Disorder. Please consult a professional."
              : "Low risk of Autism, but consulting a doctor for further analysis is advised."}
          </p>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Go to Home
      </button>

      <p className="mt-4 text-red-600 font-semibold">
        This website is still in the development phase. The results are based on an ML model and are not a medical diagnosis.
      </p>
    </div>
  );
}


