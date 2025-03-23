import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">User Dashboard</h2>

        {user ? (
          <>
            <div className="space-y-2 text-gray-600">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Date of Birth:</strong> {user.dob}</p>
              <p><strong>Ethnicity:</strong> {user.ethnicity}</p>
            </div>

            {user.result ? (
              <div className="mt-4 bg-blue-100 p-4 rounded-lg">
                <p className="text-blue-700 font-medium">
                  <strong>Latest ASD Test Result:</strong> {Number(user.result.score).toFixed(2)}%
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Date:</strong> {user.result.date ? new Date(user.result.date).toLocaleString() : "Not Available"}
                </p>
              </div>
            ) : (
              <p className="mt-4 text-gray-500">No test results yet.</p>
            )}
          </>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


