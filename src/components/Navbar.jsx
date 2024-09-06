
import React, { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import useSidebarStore from "../utils/useSideBarStore";


const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<nav className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white p-4 shadow-lg w-full">
			<div className="flex justify-between items-center w-full">
				{/* Brand Name */}
				<Link to="/">
					<div className="text-2xl font-bold tracking-wide ">SARATHI</div>
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
				<ul className="hidden md:flex space-x-6 ml-auto">
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
					<li>
						<Link
							to="/login"
							className="hover:text-gray-300 transition-colors duration-300"
						>
							Login
						</Link>
					</li>
				</ul>
			</div>

			{/* Fullscreen Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="fixed inset-0 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white flex flex-col items-center justify-center z-50 ">
					<button
						onClick={toggleMobileMenu}
						className="absolute top-4 right-4 flex items-center gap-2 text-xl font-bold"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 "
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
								Find mentor
							</Link>
						</li>
						<li>
							<Link to="/about" onClick={toggleMobileMenu}>
								About
							</Link>
						</li>
						<li>
							<Link to="/login" onClick={toggleMobileMenu}>
								Login
							</Link>
						</li>
					</ul>

					<div className="mt-16 text-center">
						<p className="font-semibold text-lg">Get in touch</p>
						<a href="contact@yourwebsite.com" className="text-xl">
							contact@yourwebsite.com
						</a>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
