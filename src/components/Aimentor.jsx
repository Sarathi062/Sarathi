import React from 'react';

export default function Aimentor() {
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center max-w-4xl mx-auto mt-12">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">AI Mentor - Coming Soon!</h1>
      <p className="text-lg font-semibold text-gray-700 mb-6">
        This is a premium feature. Get ready for a revolutionary mentorship experience.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Abstract</h2>
        <p className="text-gray-700 text-justify mb-4">
          In today's fast-paced digital world, mentorship is crucial for personal and professional development.
          SARATHI aims to bridge the mentorship gap, especially in rural and underprivileged communities,
          by providing an AI-driven Mentor Connect platform. This platform creates meaningful mentor-mentee relationships,
          providing tailored growth opportunities for mentees.
        </p>
        <p className="text-gray-700 text-justify mb-4">
          SARATHI uses AI, gamification, and mental health support tools to create an engaging environment for mentees.
          By aligning with India's NEP 2020, SARATHI promotes skill development and personalized learning. It serves
          students, young professionals, and underserved communities, democratizing access to high-quality mentorship.
        </p>
      </div>

      <div className="bg-indigo-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-indigo-800 mb-2">Why SARATHI?</h2>
        <ul className="list-disc list-inside text-gray-700 text-left mx-auto max-w-xl">
          <li>AI-driven mentor-mentee matching based on skills, interests, and career goals.</li>
          <li>Gamification elements to foster engagement, with rewards and badges.</li>
          <li>Real-time communication via video conferencing for a seamless experience.</li>
          <li>Focus on mental wellness through counseling and stress management tools.</li>
        </ul>
      </div>

      <p className="text-md text-gray-600 mb-6">
        Access to high-quality mentorship is limited, particularly in rural areas. SARATHI aims to solve this by providing
        a scalable platform that connects individuals with mentors, breaking down geographical barriers.
      </p>

      <div className="mt-8">
        <button className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition-colors duration-300">
          Learn More About SARATHI
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-800">Coming Soon!</h2>
        <p className="text-gray-600">
          Stay tuned for updates and be the first to experience the future of mentorship.
        </p>
      </div>
    </div>
  );
}
