import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MentorDashboard.css";
import SessionCard from "./SessionCard.jsx";

const MentorDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [sessionRequests, setSessionRequests] = useState([]);
  const [createdSessions, setCreatedSessions] = useState([]);  
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/dashboard-mentor", {
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
        setSessionRequests(data.sessionRequests || []);
        setCreatedSessions(data.createdSessions || []); // Fetch created sessions
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  const fetchCreatedSessions = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3001/get-session", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unknown error occurred");
      } else {
        console.log(data.sessions); 
        setCreatedSessions(data.sessions); // Replace old sessions with the new data
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      alert("Failed to fetch session. Please try again.");
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchCreatedSessions();
  }, []); // Empty array ensures this runs only on mount

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Mentor Dashboard</h1>

      <button
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        onClick={() => navigate("/create-session")}
      >
        Create Session
      </button>

      {/* <button
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        onClick={fetchCreatedSessions}
      >
        Fetch Created Sessions
      </button> */}

      <div className="flex flex-row space-x-4">
        {/* Left column - Session Requests */}
        <div className="w-1/2 bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-bold mb-4">Session Requests</h2>
          {sessionRequests.length > 0 ? (
            <ul>
              {sessionRequests.map((request, index) => (
                <li key={index} className="mb-4">
                  <div className="flex justify-between">
                    <span>
                      {request.menteeName} - {request.sessionTime}
                    </span>
                    <button
                      onClick={() => handleApproveRequest(request.id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                    >
                      Approve
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pending session requests</p>
          )}
        </div>

        {/* Right column - Google Calendar */}
        <div className="w-1/2">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=your_timezone"
            style={{ border: 0 }}
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            title="Google Calendar"
          ></iframe>

          {/* Session Cards */}
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4">Created Sessions</h2>
            {createdSessions.length > 0 ? (
              createdSessions.map((session) => (
                <SessionCard key={session._id} session={session} />
              ))
            ) : (
              <p>No created sessions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
