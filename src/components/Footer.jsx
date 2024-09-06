import React from 'react';
import { FaLinkedin, FaTwitter, FaFacebookF } from 'react-icons/fa'; // Import additional icons

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="text-2xl font-bold">
            <a href="/" className="hover:text-gray-300">Sarathi</a>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:text-gray-300">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-300">About</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">Contact</a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
              </li>
            </ul>
          </nav>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-blue-600 hover:text-blue-400">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-300">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-gray-200">
              <FaFacebookF size={24} />
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} YourWebsite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
