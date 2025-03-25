import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">About Us</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to <span className="font-semibold">Thousand Sunny</span>, where we leverage Machine Learning to assist in Autism Spectrum Disorder (ASD) detection. 
          Our approach is based on a model that analyzes responses to 10 carefully designed behavioral questions, 
          providing a percentage score indicating the likelihood of ASD.
        </p>
        
        <h2 className="text-2xl font-semibold text-blue-600 mt-6">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed mt-2">
          Our goal is to make early ASD detection accessible and efficient. By utilizing advanced data-driven techniques, 
          we aim to support individuals and families in understanding ASD better.
        </p>
        
        <h2 className="text-2xl font-semibold text-blue-600 mt-6">How It Works</h2>
        <p className="text-gray-700 text-lg leading-relaxed mt-2">
          Our system prompts users with 10 behavioral questions. Based on their responses, our trained ML model calculates a probability score, 
          which indicates the likelihood of ASD traits. While not a clinical diagnosis, our tool provides valuable insights that can encourage 
          further professional evaluation.
        </p>
        
        <h2 className="text-2xl font-semibold text-blue-600 mt-6">Research & Development</h2>
        <p className="text-gray-700 text-lg leading-relaxed mt-2">
          We are committed to advancing ASD detection through technology. Our research team is working on publishing a scientific paper detailing our 
          model’s methodology, data analysis, and accuracy results to contribute to the global understanding of ASD detection through AI.
        </p>
        
        <h2 className="text-2xl font-semibold text-blue-600 mt-6">Get Involved</h2>
        <p className="text-gray-700 text-lg leading-relaxed mt-2">
          Join us in our mission to make ASD detection more accessible. Whether you're a researcher, developer, or someone passionate about 
          mental health, we welcome collaborations and contributions.
        </p>
        
        <div className="text-center mt-6">
          <Link to="/contact" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
  