import React from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa"; // Import LinkedIn and Twitter icons
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const onClick = () => {
    navigate(`/Mentors/${mentor.id}`); // Navigate to the mentor profile using ID
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border hover:border-blue-500 max-w-sm mx-auto">
      <img
        src={`https://picsum.photos/seed/${mentor.id}/200/200`}
        alt={mentor.name}
        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200"
      />
      <h2 className="text-2xl font-bold text-center">{mentor.name}</h2>
      <p className="text-center text-sm text-gray-600">{mentor.title}</p>
      <p className="mt-4 text-center">{mentor.description}</p>

      <div className="mt-6">
        {/* Additional Mentor Details */}
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-gray-800">Session Type:</p>
          <p className="text-gray-600">{mentor.sessionType}</p>
        </div>
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-gray-800">Experience Level:</p>
          <p className="text-gray-600">{mentor.experienceLevel}</p>
        </div>
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-gray-800">Language:</p>
          <p className="text-gray-600">{mentor.language}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            <FaLinkedin size={24} />
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-600">
            <FaTwitter size={24} />
          </a>
        </div>

        {/* Connect Button */}
        <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300" onClick={onClick}>
          Connect
        </button>
      </div>
    </div>
  );
};

export default MentorCard;
