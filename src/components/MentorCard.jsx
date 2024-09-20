import React from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate(); 

  const onClick = () => {
    navigate(`/Mentors/${mentor._id}`); 
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border hover:border-blue-500 max-w-xs mx-auto flex flex-col items-center">
      {/* Profile Image */}
      <img
        src={`https://picsum.photos/seed/${mentor._id}/200/200`}
        alt={mentor.firstName}
        className="w-32 h-32 rounded-full mb-4 border-4 border-gray-200"
      />

      {/* Mentor Name and Title */}
      <h2 className="text-2xl font-bold text-center">{mentor.firstName} {mentor.lastName}</h2>
      <p className="text-center text-sm text-gray-600">{mentor.jobTitle}</p>

      {/* Mentor Description */}
      <p className="mt-4 text-center text-gray-700">{mentor.description}</p>

      {/* Mentor Details */}
      <div className="mt-6 w-full">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-gray-800">Language:</p>
          <p className="text-gray-600">{mentor.language}</p>
        </div>
      </div>
      <div className="mt-6 w-full">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-gray-800">Location:</p>
          <p className="text-gray-600">{mentor.location}</p>
        </div>
      </div>

      

      {/* Social Icons and Connect Button */}
      <div className="flex justify-between items-center mt-6 w-full">
        <div className="flex space-x-4">
          <a href={mentor.linkedin} className="text-blue-600 hover:text-blue-800">
            <FaLinkedin size={24} />
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-600">
            <FaTwitter size={24} />
          </a>
        </div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300"
          onClick={onClick}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default MentorCard;
