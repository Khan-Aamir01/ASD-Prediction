import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^[a-zA-Z0-9@#_-]{6,}$/; // At least 6 chars, no weird symbols
    return passwordRegex.test(password);
  };

  const validateDob = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 10 && age <= 80;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      alert("Invalid email format!");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must be at least 6 characters long and contain only letters, numbers, @, #, _, or -.");
      return;
    }

    if (!validateDob(dob)) {
      alert("Age must be between 10 and 80 years old.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = { name, dob, gender, ethnicity, email, password };

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/users", userData);
      if (response.status === 201) {
        alert("Signup successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Signup failed. Please try again.";

      if (errorMessage.includes("User already exists")) {
        if (window.confirm("User already exists! Do you want to log in instead?")) {
          navigate("/login");
        }
      } else {
        alert(errorMessage);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Date of Birth</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Ethnicity</label>
            <select value={ethnicity} onChange={(e) => setEthnicity(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="">Select Ethnicity</option>
              <option value="Asian">Asian</option>
              <option value="Black or African American">Black or African American</option>
              <option value="Hispanic or Latino">Hispanic or Latino</option>
              <option value="Native American or Alaska Native">Native American or Alaska Native</option>
              <option value="Native Hawaiian or Pacific Islander">Native Hawaiian or Pacific Islander</option>
              <option value="White">White</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

