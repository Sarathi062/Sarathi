import React from "react";

const Navbar = () => {
	return (
		<nav className="bg-blue-900 text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-xl font-bold">MentorConnect</div>
				<ul className="flex space-x-4">
					<li>
						<a href="/" className="hover:text-blue-300">
							Home
						</a>
					</li>
					<li>
						<a href="/mentors" className="hover:text-blue-300">
							Find Mentors
						</a>
					</li>
					<li>
						<a href="/about" className="hover:text-blue-300">
							About
						</a>
					</li>
					<li>
						<a href="/login" className="hover:text-blue-300">
							Login
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
