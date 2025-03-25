import React from "react";

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Our Services</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">1. ASD Screening Tool</h2>
          <p className="text-gray-600 mt-2">
            Our machine learning model takes **10 behavioral questions** and predicts the probability of Autism Spectrum Disorder (ASD). 
            This helps in raising early awareness and guiding the next steps.
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">2. Research & Data Analysis</h2>
          <p className="text-gray-600 mt-2">
            We are actively working on improving our model using real-world data. Our team at **Thousand Sunny** is dedicated to publishing a research paper 
            to contribute to the scientific community and enhance ASD detection accuracy.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">3. Educational Resources</h2>
          <p className="text-gray-600 mt-2">
            We provide informative articles and resources about Autism Spectrum Disorder to help individuals and caregivers understand ASD better.
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">4. Consultation & Support (Future Plan)</h2>
          <p className="text-gray-600 mt-2">
            We plan to collaborate with healthcare professionals to provide expert consultation and connect users with the right medical guidance.
          </p>
        </div>
      </div>
    </div>
  );
}