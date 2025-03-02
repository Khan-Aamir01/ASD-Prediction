import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const responses = location.state?.responses || {}; // Get responses passed from Questionnaire

  // Example: Simple logic to count "Yes" responses (Modify based on ML output)
  const yesCount = Object.values(responses).filter((answer) => answer === "Yes").length;
  const resultText =
    yesCount >= 8
      ? "High possibility of Autism Spectrum Disorder. Please consult a professional."
      : "Low risk of Autism, but consulting a doctor for further analysis is advised.";

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-bold text-blue-600">Assessment Result</h1>
      <p className="mt-4 text-lg text-gray-700">{resultText}</p>
      

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Go to Home
      </button>
      {/* Development Phase Disclaimer */}
      <p className="mt-4 text-red-600 font-semibold">
        This website is still in the development phase, and the result is currently hardcoded.
      </p>
      
    </div>
  );
}
