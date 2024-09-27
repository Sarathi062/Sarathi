import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/Mentors/${mentor.id}`);
  };

  // Function to calculate total experience duration
  const getTotalExperience = () => {
    return mentor.experience.reduce((total, exp) => total + exp.duration, 0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border hover:border-blue-500 max-w-xs mx-auto flex flex-col items-center">
      {/* Profile Image with Placeholder Fallback */}
      <img
        src={`https://picsum.photos/seed/${mentor._id}/200/200`} 
        onError={(e) => (e.target.src = "/default-avatar.png")} 
        alt={`${mentor.firstName} ${mentor.lastName}`}
        className="w-32 h-32 rounded-full mb-4 border-4 border-gray-200 object-cover"
      />

      <h2 className="text-2xl font-bold text-center mb-1">
        {mentor.firstName} {mentor.lastName}
      </h2>
      <p className="text-center text-sm text-gray-600 mb-3">{mentor.jobTitle}</p>

      <p className="mt-1 text-center text-gray-700 text-sm mb-4">
        {mentor.description ? mentor.description : "No description available."}
      </p>

      {/* Mentor Details */}
      <div className="w-full space-y-3">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-800">Language:</p>
          <p className="text-gray-600">{mentor.language || "N/A"}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-800">Total Experience:</p>
          <p className="text-gray-600">{getTotalExperience()} years</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-800">Location:</p>
          <p className="text-gray-600">{mentor.location || "Remote"}</p>
        </div>
      </div>

      {/* Social Media and Connect Button */}
      <div className="flex justify-between items-center mt-6 w-full">
        <div className="flex space-x-4">
          {mentor.linkedin && (
            <a
              href={mentor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
          )}
          {mentor.twitter && (
            <a
              href={mentor.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter profile"
              className="text-blue-400 hover:text-blue-600 transition-colors"
            >
              <FaTwitter size={24} />
            </a>
          )}
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
