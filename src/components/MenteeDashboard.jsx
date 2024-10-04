import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MenteeDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  const loadDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://sarathi-backend-cgm8.onrender.com/dashboard-mentee", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        navigate("/login");
      } else {
        setDashboardData(data);
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };

  useEffect(() => {
    loadDashboard(); // Automatically load dashboard data when the component mounts
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Mentee Dashboard</h1>

      {/* Display dashboard data if available */}
      {dashboardData ? (
        <div>
          <p>
            <strong>Welcome back, {dashboardData.name}!</strong>
          </p>
          <p>
            <strong>Your Progress:</strong> {dashboardData.progress}%
          </p>
          <p>
            <strong>Next Session:</strong> {dashboardData.nextSession}
          </p>
          <p>
            <strong>Mentor:</strong> {dashboardData.mentorName}
          </p>
        </div>
      ) : (
        <p>Loading your dashboard data...</p>
      )}
    </div>
  );
};

export default MenteeDashboard;
