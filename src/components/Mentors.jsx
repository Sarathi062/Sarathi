import React from 'react';
import { useParams } from 'react-router-dom';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

// Sample mentor data
const mentorsList = [
    {
      id: '1',
      name: 'Jane Smith',
      title: 'Senior Data Scientist',
      description: 'Experienced in machine learning and data analytics.',
      experienceLevel: 'Expert',
      language: 'English',
      sessionType: 'One-on-One',
      schedule: {
        Monday: '9am - 5pm',
        Tuesday: '10am - 4pm',
        Wednesday: 'Unavailable',
        Thursday: '12pm - 6pm',
        Friday: '9am - 3pm',
        Saturday: 'Unavailable',
        Sunday: 'Unavailable',
      },
      rating: 4.9,
      reviews: [
        { reviewer: 'Alice', comment: 'Incredibly insightful sessions!', rating: 5 },
        { reviewer: 'Bob', comment: 'Helped me understand complex topics.', rating: 4.8 },
      ],
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/janesmith',
        twitter: 'https://twitter.com/janesmith',
      },
    },
];

const Mentors = () => {
  const { id } = useParams(); 

  // Find the mentor with the matching ID
  const mentor = mentorsList.find((mentor) => mentor.id === id);

  if (!mentor) {
    return <p>Mentor not found</p>;
  }

  // Function to book a session and create a Google Calendar event
  // const bookSession = async () => {
  //   try {
  //     // Check if the user is authenticated
  //     const authCheck = await fetch('http://localhost:3001/auth-check'); // Add an auth-check route to your server
  //     if (!authCheck.ok) {
  //       window.location.href = 'http://localhost:3001/auth'; // Redirect to authenticate if not authenticated
  //       return;
  //     }
  
  //     // Data for the session event
  //     const eventData = {
  //       title: `Session with ${mentor.name}`,
  //       description: `Book a mentoring session with ${mentor.name} (${mentor.sessionType})`,
  //       start: '2024-09-18T09:00:00-07:00', // Example start time
  //       end: '2024-09-18T10:00:00-07:00',   // Example end time
  //     };
  
  //     // Sending a POST request to your server to create a calendar event
  //     const response = await fetch('http://localhost:3001/add-event', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(eventData),
  //     });
  
  //     const data = await response.json();
  
  //     if (response.ok) {
  //       alert('Session successfully booked and added to Google Calendar!');
  //     } else {
  //       alert(`Failed to book session: ${data.message}`);
  //     }
  //   } catch (error) {
  //     console.error('Error booking session:', error);
  //   }
  // };
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Header Section */}
      <div className="flex items-center">
        <img
          src={`https://picsum.photos/seed/${mentor.id}/200/200`}
          alt={mentor.name}
          className="w-32 h-32 rounded-full mr-6"
        />
        <div>
          <h1 className="text-3xl font-bold">{mentor.name}</h1>
          <p className="text-gray-600">{mentor.title}</p>
          <div className="flex items-center mt-2">
            <a
              href={mentor.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center mr-4"
            >
              <FaLinkedin className="mr-1" /> LinkedIn
            </a>
            <a
              href={mentor.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline flex items-center"
            >
              <FaTwitter className="mr-1" /> Twitter
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
            <li><strong>Experience Level:</strong> {mentor.experienceLevel}</li>
            <li><strong>Language:</strong> {mentor.language}</li>
            <li><strong>Session Type:</strong> {mentor.sessionType}</li>
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
              {Object.entries(mentor.schedule).map(([day, availability]) => (
                <tr key={day}>
                  <td className="py-1">{day}</td>
                  <td className="py-1">{availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rating and Reviews */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Rating</h2>
        <div className="flex items-center">
          <p className="text-2xl font-bold mr-2">{mentor.rating}</p>
          <p>/ 5</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Reviews:</h3>
          {mentor.reviews.map((review, index) => (
            <div key={index} className="border-t py-2">
              <p>
                <strong>{review.reviewer}</strong> rated {review.rating} / 5
              </p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-6 text-center">
        <button
          // onClick={bookSession}
          className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300"
        >
          Book a Session
        </button>
      </div>
    </div>
  );
};

export default Mentors;
