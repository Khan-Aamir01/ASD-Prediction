import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Questions() {
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  const questions = [
    "Do you find it difficult to maintain eye contact during conversations?",
    "Do you have trouble understanding social cues (like tone of voice or facial expressions)?",
    "Do you prefer routines and get anxious with unexpected changes?",
    "Do you have difficulty making or maintaining friendships?",
    "Do you get deeply focused on specific interests or hobbies?",
    "Do you often feel overwhelmed in loud or crowded places?",
    "Do you have a tendency to repeat words or phrases (echolalia)?",
    "Do you struggle with understanding sarcasm or jokes?",
    "Do you find it difficult to express your emotions to others?",
    "Do you feel uncomfortable with physical touch or certain textures?",
    "Do you have a strong preference for sameness in your daily activities?",
    "Do you experience sensory sensitivities (e.g., bright lights, loud noises)?",
    "Do you have trouble starting or maintaining conversations?",
    "Do you often engage in repetitive movements (e.g., hand-flapping, rocking)?",
    "Do you prefer being alone rather than socializing with others?"
  ];

  const handleChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
  };

  const handleSubmit = () => {
    console.log("User Responses:", responses);
    navigate("/result", { state: { responses } }); // Redirect to result page with responses
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Autism Spectrum Disorder Questionnaire
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <form>
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg font-medium text-gray-800">{index + 1}. {question}</p>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`q${index}`}
                    value="Yes"
                    onChange={() => handleChange(index, "Yes")}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`q${index}`}
                    value="No"
                    onChange={() => handleChange(index, "No")}
                    className="mr-2"
                  />
                  No
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`q${index}`}
                    value="Not Sure"
                    onChange={() => handleChange(index, "Not Sure")}
                    className="mr-2"
                  />
                  Not Sure
                </label>
              </div>
            </div>
          ))}

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Submit Responses
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
