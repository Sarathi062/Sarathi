import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SessionCard from "./SessionCard.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

const MentorDashboard = () => {
  const [createdSessions, setCreatedSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [calendarId, setCalendarId] = useState(null);
  const navigate = useNavigate();

  // Fetch Mentor Dashboard Data
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/dashboard-mentor", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Error fetching dashboard data");
      }

      const data = await res.json();
      setCreatedSessions(data.createdSessions || []);
      setLoading(false);
    } catch (error) {
      setError("Failed to load dashboard data");
      setLoading(false);
    }
  };

  const fetchUserCalendar = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3001/user/calendar", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Error fetching user calendar");
      }

      const data = await res.json();
      setCalendarId(data.calendarId);
    } catch (error) {
      setError("Error fetching user calendar.");
    }
  };

  const fetchSessionDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const mentorID = JSON.parse(atob(token.split(".")[1])).id; // Decode token to get mentor ID
      const res = await fetch(`http://localhost:3001/get-session`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          mentorid: mentorID, // Include mentorID in headers
        },
      });

      if (!res.ok) {
        throw new Error("Error fetching session details");
      }

      const data = await res.json();
      setCreatedSessions(data.sessions || []);
    } catch (error) {
      console.error("Error fetching session details:", error);
      setError("Failed to load session details");
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchUserCalendar();
    fetchSessionDetails();
  }, []);

  // Search functionality for filtering sessions
  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredSessions = createdSessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add a new event to the calendar
  const addEvent = async () => {
    try {
      const res = await fetch("http://localhost:3001/add-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: "Event Title",
          description: "Event Description",
          start: "2024-09-01T10:00:00",
          end: "2024-09-01T11:00:00",
        }),
      });

      if (!res.ok) {
        throw new Error("Error adding event to calendar");
      }

      alert("Event added to calendar");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-8">
      {/* Running Note */}
      <div className="w-full bg-blue-100 text-blue-900 p-4 rounded-md shadow-lg text-center font-semibold">
        All sessions automatically generate a Google Meet link, which is sent to
        mentees. You have full access, and everything is ready for you to join
        the meet!
      </div>
      <div className="w-full flex bg-white rounded-xl shadow-lg p-8 space-x-6 h-[90vh]">
        {" "}
        {/* Adjust height */}
        <div className="w-1/2 h-full pr-4">
          {" "}
          {/* Adjust height */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          <h1 className="text-3xl font-bold text-center mb-6">
            Mentor Dashboard
          </h1>
          <div className="flex justify-center space-x-4 mb-6">
            <button
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
              onClick={() => navigate("/create-session")}
            >
              Create Session
            </button>
            <button
              className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
              onClick={addEvent}
            >
              Add Event to Calendar
            </button>
          </div>
          {/* Google Calendar Embed */}
          {calendarId ? (
            <iframe
              src={`https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=America/Los_Angeles`}
              style={{ border: 0 }}
              width="100%"
              height="80%" // Full height
              frameBorder="0"
              scrolling="no"
              title="User's Google Calendar"
              className="rounded-lg shadow-md"
            ></iframe>
          ) : (
            <p className="text-gray-600">Loading calendar...</p>
          )}
        </div>
        {/* Created Sessions Section */}
        <div className="w-1/2 h-full flex flex-col">
          {" "}
          {/* Adjust height */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search sessions..."
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-col space-y-6 h-full overflow-auto">
              {" "}
              {/* Ensure proper overflow */}
              <h2 className="text-xl font-semibold mb-4">Created Sessions</h2>
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session) => (
                    <SessionCard key={session._id} session={session} />
                  ))
                ) : (
                  <p>No created sessions found</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
