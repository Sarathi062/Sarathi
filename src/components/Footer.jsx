import React from "react";
import { FaLinkedin, FaTwitter, FaFacebookF } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-[#001f3f] text-white py-8">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row justify-between items-center">
					{/* Logo or Brand Name */}
					<div className="text-2xl font-bold mb-4 md:mb-0">
						<a href="/" className="hover:text-gray-300 transition-colors">
							Sarathi
						</a>
					</div>

					{/* Navigation Links */}
					<nav className="mb-4 md:mb-0">
						<ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
							<li>
								<a href="/" className="hover:text-gray-300 transition-colors">
									Home
								</a>
							</li>
							<li>
								<a
									href="/about"
									className="hover:text-gray-300 transition-colors"
								>
									About
								</a>
							</li>
							<li>
								<a
									href="/contact"
									className="hover:text-gray-300 transition-colors"
								>
									Contact
								</a>
							</li>
							<li>
								<a
									href="/privacy"
									className="hover:text-gray-300 transition-colors"
								>
									Privacy Policy
								</a>
							</li>
						</ul>
					</nav>

					{/* Social Media Links */}
					<div className="flex space-x-4 mt-4 md:mt-0">
						<a
							href="#"
							className="text-blue-600 hover:text-blue-400 transition-colors"
						>
							<FaLinkedin size={24} />
						</a>
						<a
							href="#"
							className="text-blue-400 hover:text-blue-300 transition-colors"
						>
							<FaTwitter size={24} />
						</a>
						<a
							href="#"
							className="text-gray-300 hover:text-gray-200 transition-colors"
						>
							<FaFacebookF size={24} />
						</a>
					</div>
				</div>

				<div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
					<p>&copy; {new Date().getFullYear()} Sarathi. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
