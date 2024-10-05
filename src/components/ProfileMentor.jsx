import { set } from "mongoose";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const ProfileMentor = ({ setMentorLogin, setLogedIn }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
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
      }

      setProfile(data.profile);
      setLoading(false);
    } catch (error) {
      window.alert(`Error: ${error.message}`);
    }
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  function openGoogleAuthPopup() {
    fetch("https://sarathi-backend-cgm8.onrender.com/auth")
      .then((response) => response.json())
      .then((data) => {
        const authUrl = data.url;
        const popup = window.open(
          authUrl,
          "googleAuthPopup",
          "width=500,height=600"
        );

        const handleAuthMessage = (event) => {
          if (event.data.success) {
            if (popup && !popup.closed) {
              popup.close();
            }
            setTimeout(() => {
              navigate("/mentor-dashboard");
            }, 100);
          }
        };

        window.addEventListener("message", handleAuthMessage, { once: true });
      })
      .catch((error) => {
        console.error("Error fetching OAuth URL:", error);
      });
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-6">
          {profile && !profile.authenticated && (
            <div className="w-full bg-red-100 text-blue-900 p-4 rounded-md shadow-lg text-center font-semibold mb-4">
              Authenticate Using The Email That Was Used While Logging In
            </div>
          )}

          {/* Main content wrapper */}
          <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-extrabold text-blue-800 text-center mb-6">
              Mentor Profile
            </h1>

            {profile ? (
              <div className="space-y-8">
                {/* Profile Info */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                  <p className="text-xl">
                    <strong className="font-semibold text-blue-800">
                      Name:
                    </strong>{" "}
                    {profile.firstName} {profile.lastName}
                  </p>
                  <p className="text-xl mt-2">
                    <strong className="font-semibold text-blue-800">
                      Email:
                    </strong>{" "}
                    {profile.email}
                  </p>
                  <p className="text-xl mt-2">
                    <strong className="font-semibold text-blue-800">
                      Mentorship Areas:
                    </strong>{" "}
                    Design, Product Management
                  </p>
                </div>

                {/* Mentorship Insights */}
                <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold text-blue-800">
                    Mentorship Insights
                  </h2>
                  <ul className="list-disc ml-6 text-gray-800 mt-3 space-y-1">
                    <li className="text-lg">
                      <strong>Hours Mentored:</strong> 2 hrs
                    </li>
                    <li className="text-lg">
                      <strong>Mentee Satisfaction:</strong> 2.3 / 5
                    </li>
                    <li className="text-lg">
                      <strong>Impact:</strong> 34% mentees improved in XYZ areas
                    </li>
                  </ul>
                </div>

                {/* Mentor action buttons */}
                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
                  <button
                    onClick={handleEditProfile}
                    className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3 rounded-lg shadow-md transition duration-300"
                  >
                    Edit Profile
                  </button>

                  {!profile.authenticated && (
                    <button
                      onClick={openGoogleAuthPopup}
                      className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-3 rounded-lg shadow-md transition duration-300"
                    >
                      Authenticate Profile
                    </button>
                  )}
                </div>

                {/* Helpful Resources */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-sm mt-8">
                  <h2 className="text-2xl font-semibold text-blue-800">
                    Helpful Resources for Mentors
                  </h2>
                  <ul className="list-disc ml-6 text-gray-800 mt-3 space-y-2">
                    <li>
                      <a
                        href="https://link.to/mentorship-tips"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Effective Mentoring Tips
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://link.to/mental-health"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Managing Stress as a Mentor
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://link.to/gamification"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        How Gamification Boosts Engagement
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 text-xl">
                Loading profile...
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileMentor;
