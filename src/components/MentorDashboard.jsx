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
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // Helper function to handle token fetching and validation
  const getToken = () => localStorage.getItem("token");

  // Fetch Profile Data
  const fetchProfile = async () => {
    try {
      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(
        "https://sarathi-backend-cgm8.onrender.com/profile-mentor",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        navigate("/login");
        return;
      }

      setProfile(data.profile);
    } catch (error) {
      window.alert(`Error: ${error.message}`);
    }
  };

  // Fetch Mentor Dashboard and Session Data
  const fetchDashboardAndSessions = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) throw new Error("Unauthorized access");

      // Fetch dashboard data and session details concurrently
      const [dashboardRes, sessionRes, calendarRes] = await Promise.all([
        fetch("https://sarathi-backend-cgm8.onrender.com/dashboard-mentor", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("https://sarathi-backend-cgm8.onrender.com/get-session", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            mentorid: JSON.parse(atob(token.split(".")[1])).id,
          },
        }),
        fetch("https://sarathi-backend-cgm8.onrender.com/user/calendar", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }),
      ]);

      if (!dashboardRes.ok) {
        throw new Error("Error fetching dashboard data");
      }

      if (!sessionRes.ok) {
        throw new Error("Error fetching session details");
      }

      if (!calendarRes.ok) {
        throw new Error("Error fetching user calendar");
      }

      // Parse the responses
      const dashboardData = await dashboardRes.json();
      const sessionData = await sessionRes.json();
      const calendarData = await calendarRes.json();

      // Update state with data
      setCreatedSessions(sessionData.sessions || []);
      setCalendarId(calendarData.calendarId);
      setLoading(false);
    } catch (error) {
      setError(error.message || "Failed to load dashboard data");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the profile first, then fetch dashboard data and sessions
    const loadData = async () => {
      await fetchProfile();
    };

    loadData();
  }, []);

  useEffect(() => {
    // Ensure profile is fully loaded before making other API calls
    if (profile && profile.authenticated) {
      fetchDashboardAndSessions();
    } else if (profile && !profile.authenticated) {
      navigate("/mentor-profile");
    }
  }, [profile]);

  // Search functionality for filtering sessions
  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredSessions = createdSessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add a new event to the calendar
  const addEvent = async (session) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Unauthorized access");

      // Prepare the event details using session information
      const eventDetails = {
        title: session.title, // Use the current session's title
        description: session.description || "No description provided",
        start: {
          dateTime: session.start, // Ensure this is in ISO format
          timeZone: "Asia/Kolkata", // Adjust based on your timezone
        },
        end: {
          dateTime: session.end, // Ensure this is in ISO format
          timeZone: "Asia/Kolkata", // Adjust based on your timezone
        },
      };
      const res = await fetch(
        "https://sarathi-backend-cgm8.onrender.com/add-event",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventDetails),
        }
      );

      console.log(res.hangoutLink);
      if (!res.ok) {
        throw new Error("Error adding event to calendar");
      }

      const responseData = await res.json();
      alert(responseData.message || "Event added to calendar");
    } catch (error) {
      alert(error.message || "Failed to add event");
    }
  };

  // Iterate over each filtered session and call addEvent
  const addEventsForFilteredSessions = async () => {
    for (const session of filteredSessions) {
      await addEvent(session); // Await here to ensure each event is added sequentially
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen flex flex-col bg-gray-50 p-8">
          <div className="w-full bg-blue-100 text-blue-900 p-4 rounded-md shadow-lg text-center font-semibold">
            All sessions automatically generate a Google Meet link, which is
            sent to mentees. You have full access, and everything is ready for
            you to join the meet!
          </div>
          <div className="w-full flex bg-white rounded-xl shadow-lg p-8 space-x-6 h-[90vh]">
            <div className="w-1/2 h-full pr-4">
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
                  onClick={addEventsForFilteredSessions}
                >
                  Add Event to Calendar
                </button>
              </div>
              {calendarId ? (
                <iframe
                  src={`https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=Asia%2FKolkata`}
                  style={{ border: 0 }}
                  width="100%"
                  height="80%"
                  frameBorder="0"
                  scrolling="no"
                  title="User's Google Calendar"
                  className="rounded-lg shadow-md"
                ></iframe>
              ) : (
                <p className="text-gray-600">Loading calendar...</p>
              )}
            </div>
            <div className="w-1/2 h-full flex flex-col">
              {createdSessions && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search sessions..."
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
              )}
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="flex flex-col space-y-6 h-full overflow-auto">
                  <h2 className="text-xl font-semibold mb-4">
                    Created Sessions
                  </h2>
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
      )}
    </>
  );
};

export default MentorDashboard;
