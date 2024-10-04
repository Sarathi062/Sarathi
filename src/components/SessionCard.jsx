const SessionCard = ({ session }) => {
  // Extract start and end times
  const startDate = new Date(session.start);
  const endDate = new Date(session.end);

  // Format date and time
  const dateString = startDate.toLocaleDateString(); // e.g., "9/30/2024"
  const timeString = `${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  const mentees = Array.isArray(session.menteesID) && session.menteesID.length > 0 ? session.menteesID.join(", ") : "No mentees"; // Defensive check

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105">
      <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
      <p className="text-gray-700 mb-2">{session.description}</p>
      <p className="text-gray-600 mb-2">Date: <span className="font-medium">{dateString}</span></p>
      <p className="text-gray-600 mb-2">Time: <span className="font-medium">{timeString}</span></p>
      <p className="text-gray-600 mb-2">Price: <span className="font-medium">{session.price} INR</span></p>
      <p className="text-gray-600 mb-2">Type: <span className="font-medium">{session.type}</span></p>
      {mentees.length > 0 && (
        <p className="text-gray-600 mb-2">Mentees: <span className="font-medium">{mentees}</span></p>
      )}

      <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200">
        Cancel Session
      </button>
    </div>
  );
};

export default SessionCard;
