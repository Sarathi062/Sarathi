import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineRobot } from "react-icons/ai";

const Navbar = (props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const loadDashboard = async () => {
    setIsProfileMenuOpen(false)
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("https://sarathi-backend-cgm8.onrender.com/dashboard-mentor", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        navigate("/login");
      }

      navigate("/mentor-dashboard");
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };
  // Function to handle click outside of the profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-gray-800 to-gray-900 text-white p-4 shadow-lg w-full transition-all duration-300">
      <div className="flex justify-between items-center w-full">
        {/* Brand Name or AI Icon */}
        <Link to="/" className="flex items-center space-x-2">
          <AiOutlineRobot className="text-3xl text-white" />
          <h1 className="text-2xl font-bold">Sarathi</h1>
        </Link>

        {/* Hamburger Menu Icon for Mobile */}
        <button onClick={toggleMobileMenu} className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.293 6.293a1 1 0 011.414 0L12 12.586l6.293-6.293a1 1 0 111.414 1.414L13.414 14l6.293 6.293a1 1 0 01-1.414 1.414L12 15.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 14 4.293 7.707a1 1 0 010-1.414z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 ml-auto items-center">
          <li>
            <Link
              to="/"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/mentors"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Find Mentors
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              About
            </Link>
          </li>

          {/* Conditional rendering for Profile with Dropdown */}
          <li className="relative" ref={profileMenuRef}>
            {!props.logedIn ? (
              <Link
                to="/login"
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="hover:text-gray-300 transition-colors duration-300 focus:outline-none"
              >
                Profile
              </button>
            )}
            {props.logedIn && isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md py-2 z-50">
                <Link
                  to={props.menteeLogin ? "/mentee-profile" : "/mentor-profile"}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  View Profile
                </Link>
                <Link
                  to={
                    props.menteeLogin
                      ? "/mentee-dashboard"
                      : "/mentor-dashboard"
                  }
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={loadDashboard}
                >
                  Dashboard
                </Link>
                {props.menteeLogin ? null : (
                  <Link
                    to="/create-session"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Create Session
                  </Link>
                )}
                <button
                  onClick={() => {
                    // Handle logout logic here
                    localStorage.removeItem("token");
                    props.setLogedIn(false);
                    props.setMenteeLogin(false);
                    props.setMentorLogin(false);
                    setIsProfileMenuOpen(false);
                    navigate("/");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Fullscreen Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-600 text-white flex flex-col items-center justify-center z-50">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 flex items-center gap-2 text-xl font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Close
          </button>

          <ul className="flex flex-col items-start space-y-8 text-4xl font-bold">
            <li>
              <Link to="/" onClick={toggleMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/mentors" onClick={toggleMobileMenu}>
                Find Mentors
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMobileMenu}>
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-gray-300 transition-colors duration-300"
                onClick={toggleMobileMenu}
              >
                Login
              </Link>
            </li>
            <li>
              <div className="mt-16 text-center">
                <p className="font-semibold text-lg">Get in touch</p>
                <a href="mailto:contact@yourwebsite.com" className="text-xl">
                  contact@yourwebsite.com
                </a>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
