import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";

const Mentors = () => {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/get-mentor-profiles"
        );
        const data = await response.json();
        const mentorData = data.mentors.find((mentor) => mentor._id === id);
        if (mentorData) {
          setMentor(mentorData);
        } else {
          setError("Mentor not found");
        }
      } catch (error) {
        setError("Error fetching mentors");
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    mentor && (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
        {/* Header Section */}
        <div className="flex items-center">
          <img
            src={`https://picsum.photos/seed/${mentor._id}/200/200`}
            alt={mentor.firstName}
            className="w-32 h-32 rounded-full mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold">{mentor.firstName}</h1>
            <p className="text-gray-600">{mentor.jobTitle}</p>
            <div className="flex items-center mt-2">
              <a
                href={mentor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center mr-4"
              >
                <FaLinkedin className="mr-1" /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mt-6">{mentor.description}</p>

        {/* Details and Schedule */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Details Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <ul>
              {/* <li>
                <strong>Experience Level:</strong> {mentor.experienceLevel}
              </li> */}
              <li>
                <strong>Language:</strong> {mentor.language}
              </li>
              {/* <li>
                <strong>Session Type:</strong> {mentor.sessionType}
              </li> */}
            </ul>
          </div>

          {/* Schedule Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Schedule</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b pb-2">Day</th>
                  <th className="border-b pb-2">Availability</th>
                </tr>
              </thead>
              <tbody>
                {mentor.schedule &&
                  Object.entries(mentor.schedule).map(([day, availability]) => (
                    <tr key={day}>
                      <td className="py-1">{day}</td>
                      <td className="py-1">{availability}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-6 text-center">
          <Link to="/session-form" className="text-blue-600 hover:underline">
            <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300">
              Book a Session
            </button>
          </Link>
        </div>
      </div>
    )
  );
};

export default Mentors;
