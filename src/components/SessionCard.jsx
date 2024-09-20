const SessionCard = ({ session }) => {
  const mentees = Array.isArray(session.menteesID) ? session.menteesID.join(", ") : "No mentees"; // Defensive check
  return (
    <div className="session-card">
      <h3>{session.title}</h3>
      <p>{session.description}</p>
      <p>Date: {session.date}</p>
      <p>Time: {session.timeFrom} - {session.timeTo}</p>
      <p>Price: {session.price}</p>
      <p>Type: {session.type}</p>
      {mentees.length > 0 && <p>Mentees: {mentees}</p>}

      <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
        Cancel Session
      </button>
      
    </div>
  );
};

export default SessionCard;