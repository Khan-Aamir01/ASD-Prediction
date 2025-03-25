import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600">Contact Us</h2>
        <p className="text-center text-gray-600 mt-2">Have any questions? Reach out to us!</p>
        
        {submitted ? (
          <p className="text-green-600 text-center mt-4">Thank you for contacting us! We'll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-gray-700 font-semibold">Our Organization</p>
          <p className="text-blue-600 font-bold">Thousand Sunny</p>
          <p className="text-gray-700">Email: support@thousandsunny.org</p>
          <p className="text-gray-700">Phone: +123 456 7890</p>
        </div>
      </div>
    </div>
  );
}