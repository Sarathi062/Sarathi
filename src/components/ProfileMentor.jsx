import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileMentor = ({ setMentorLogin, setLogedIn }) => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/profile-mentor", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        navigate("/login");
      }

      setProfile(data.profile);
    } catch (error) {
      window.alert(`Error: ${error.message}`);
    }
  };
  const loadDashboard = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3001/dashboard-mentor", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        navigate("/login");
      }

      navigate("/mentor-dashboard");
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };
  const handleEditProfile = () => {
    navigate("/edit-profile");
  }
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMentorLogin(false);
    setLogedIn(false);
    navigate("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Mentor Profile</h1>
      {profile ? (
        <div>
          <p>
            <strong>Name:</strong> {profile.firstName} {profile.lastName}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>

          <p>
            <strong>Years of Experience:</strong> {profile.yearsOfExperience}
          </p>

          {/* Render experience section */}
          {profile.experience && profile.experience.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mt-4">Experience</h2>
              <ul className="list-disc pl-5">
                {profile.experience.map((exp, index) => (
                  <li key={index} className="mt-2">
                    <p>
                      <strong>Company:</strong> {exp.company}
                    </p>
                    <p>
                      <strong>Duration:</strong> {exp.duration}
                    </p>
                    <p>
                      <strong>Role:</strong> {exp.role}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 flex space-x-4">
            <button
              onClick={loadDashboard}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Go to Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
            <button
              onClick={handleEditProfile}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfileMentor;
