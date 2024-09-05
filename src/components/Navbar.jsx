import React from "react";
import useSidebarStore from "../utils/useSideBarStore";
import { Link } from "react-router-dom";

const Navbar = () => {
	const toggleBar = useSidebarStore((state) => state.setSidebarOpen);

	const toggleSidebar = () => {
		toggleBar();
	};

	return (
		<nav className="bg-blue-900 text-white p-4 shadow-lg w-full">
			<div className="flex justify-between items-center w-full">
				{/* Left Section: Brand Title and Sidebar Toggle Icon */}
				<div className="flex items-center gap-3">
					{/* Sidebar Toggle Icon */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						width="30"
						height="30"
						viewBox="0 0 30 30"
						className="fill-current cursor-pointer"
						onClick={toggleSidebar}
					>
						<path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
					</svg>

					{/* Brand Name */}
					<div className="text-2xl font-bold tracking-wide">Sarathi</div>
				</div>

				{/* Right Section: Navigation Links */}
				<ul className="flex space-x-6 ml-auto">
					<li>
						<Link
							to="/Sarathi"
							className="hover:text-blue-300 transition-colors duration-300"
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/mentors"
							className="hover:text-blue-300 transition-colors duration-300"
						>
							Find Mentors
						</Link>
					</li>
					<li>
						<Link
							to="/about"
							className="hover:text-blue-300 transition-colors duration-300"
						>
							About
						</Link>
					</li>
					<li>
						<Link
							to="/login"
							className="hover:text-blue-300 transition-colors duration-300"
						>
							Login
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
