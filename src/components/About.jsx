import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our platform! We are dedicated to providing a seamless and intuitive
          experience for finding and connecting with mentors across various fields.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to empower individuals by connecting them with experienced mentors who
          can guide them in their career development, skill enhancement, and personal growth.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          We believe in the power of mentorship and aim to create an accessible platform where
          mentors and mentees can collaborate, share knowledge, and achieve their goals.
        </p>
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Team</h2>
        <p className="text-lg text-gray-700 mb-4">
          Our team comprises professionals from various industries, including technology, design,
          data science, and business. Each team member brings a unique perspective and expertise
          to ensure our platform meets the highest standards of quality and user satisfaction.
        </p>
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-700 mb-4">
          Have questions or feedback? We'd love to hear from you! Reach out to us at
          <a href="mailto:contact@yourwebsite.com" className="text-blue-600 hover:underline">
            contact@yourwebsite.com
          </a>.
        </p>
        <p className="text-lg text-gray-700">
          Follow us on social media for updates and announcements:
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            LinkedIn
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-600">
            Twitter
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
