import { useNavigate } from "react-router-dom";

export default function MainContent() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Banner Image */}
      <div className="w-full flex justify-center mb-6">
        <img
          src="/assets/ASD-Banner03.jpg"
          alt="Autism Awareness"
          className="w-full max-h-60 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">
            Autism Spectrum Disorder (ASD) Prediction
          </h1>
          <p className="text-lg text-gray-700">
            Autism Spectrum Disorder (ASD) is a developmental condition affecting communication, behavior, and social interaction. Early detection is crucial for effective intervention and support.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Click the button below to start the **questionnaire**, which consists of 15-20 questions. Based on your responses, our model will provide an assessment.
          </p>

          {/* Start Questionnaire Button */}
          <button
            onClick={() => navigate("/questions")}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Start Questionnaire
          </button>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src="assets\ASD-img1.jpg"
            alt="Autism Awareness Illustration"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
