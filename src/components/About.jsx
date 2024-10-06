import React, { useState, useEffect } from "react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import yash from "../assets/yash.jpeg";
import yashraj from "../assets/yashraj.jpeg";
import Janhavi from "../assets/janhavi.jpeg";
import mission from "../assets/mission.png"

const teamMembers = [
  {
    name: "Janhavi Parihar",
    role: "Team Lead & Designer",
    image: Janhavi,
    note: "Design is not just what it looks like and feels like. Design is how it works.",
  },
  {
    name: "Vinay Basargekar",
    role: "Full Stack Developer",
    image: "https://via.placeholder.com/150",
    note: "Building scalable and efficient web applications is my passion.",
  },
  {
    name: "Tejas Patil",
    role: "Research Analyst",
    image: "https://via.placeholder.com/150",
    note: "Analyzing data to uncover insights and drive decision-making.",
  },
  {
    name: "Saurabh Rai",
    role: "Admin & Support",
    image: "https://via.placeholder.com/150",
    note: "Providing exceptional support and ensuring smooth operations.",
  },
  {
    name: "Yash Chavhan",
    role: "Research Analyst & Content Writer",
    image: yash,
    note: "Creating engaging content that educates and inspires is my mission.",
  },
  {
    name: "Yashraj Dhamale",
    role: "Full Stack Developer",
    image: yashraj,
    note: "Building robust and user-friendly web applications is my forte.",
  },
];

const AboutPage = () => {
  const [currentMember, setCurrentMember] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMember((prevMember) => (prevMember + 1) % teamMembers.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* About Us Section */}
      <div className="container mx-auto max-w-6xl bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-5xl font-extrabold text-center text-blue-900 mb-8">
          About Us
        </h1>
        <p className="text-lg text-gray-700 text-center mb-10 max-w-4xl mx-auto">
          Welcome to{" "}
          <span className="text-blue-600 font-semibold">SARATHI</span>, your
          gateway to expert mentorship. We are dedicated to providing a seamless
          platform for finding and connecting with mentors across various
          fields.
        </p>

        {/* Our Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-800">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is to empower individuals by connecting them with
              experienced mentors who can guide them in career development,
              skill enhancement, and personal growth. We believe in the power of
              mentorship and strive to create an accessible platform where
              mentors and mentees can collaborate and achieve their goals.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our team comprises professionals from various industries,
              including technology, design, data science, and business. Each
              member brings a unique perspective and expertise, ensuring our
              platform meets the highest standards of quality and user
              satisfaction.
            </p>
          </div>

          <div className="flex items-center justify-center">
            {/* You can replace this with any related image */}
            <img
              src={mission}
              alt="Mission Image"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Meet Our Team */}
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Meet Our Team
        </h2>
        <div className="relative w-full overflow-hidden h-96 mb-12">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentMember * 100}%)`,
            }}
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full h-full flex flex-col items-center justify-center bg-blue-50 p-8 shadow-lg rounded-lg space-y-4"
              >
                <img
                  src={member.image}
                  alt={`${member.name} profile`}
                  className="rounded-full w-32 h-32 mb-4 shadow-lg object-cover"
                />
                <h3 className="text-xl font-semibold text-blue-800 text-center">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-center">{member.role}</p>
                <p className="text-gray-500 text-center italic">
                  "{member.note}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="text-center bg-gray-100 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-4">
            Have questions or feedback? We’d love to hear from you! Reach out to
            us at{" "}
            <a
              href="mailto:sarathi062023@gmail.com"
              className="text-blue-600 hover:underline font-semibold"
            >
              sarathi062023@gmail.com
            </a>
            .
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Follow us on social media for updates and announcements:
          </p>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-8 mt-6">
            <a href="#" className="text-blue-600 hover:text-blue-800 text-3xl">
              <FaLinkedin />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600 text-3xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 text-3xl">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
