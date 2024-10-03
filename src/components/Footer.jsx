import { FaLinkedin, FaTwitter, FaFacebookF } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-gradient-to-r from-blue-900 via-gray-800 to-gray-900 text-white py-6 w-full">
			<div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
					{/* Brand Logo / Name */}
					<div className="text-center md:text-left">
						<h1 className="text-2xl font-extrabold">
							<a
								href="/"
								className="hover:text-blue-300 transition-colors duration-300"
							>
								Sarathi
							</a>
						</h1>
						<p className="mt-3 text-gray-400 text-sm max-w-xs">
							Your trusted platform for mentorship and growth, dedicated to
							bridging the mentorship gap and fostering learning.
						</p>
					</div>

					{/* Quick Links */}
					<div className="text-center">
						<h2 className="text-lg font-semibold mb-3">Quick Links</h2>
						<nav>
							<ul className="space-y-1">
								<li>
									<a
										href="/"
										className="hover:text-blue-300 transition-colors duration-300"
									>
										Home
									</a>
								</li>
								<li>
									<a
										href="/about"
										className="hover:text-blue-300 transition-colors duration-300"
									>
										About Us
									</a>
								</li>
								<li>
									<a
										href="/"
										className="hover:text-blue-300 transition-colors duration-300"
									>
										Privacy Policy
									</a>
								</li>
							</ul>
						</nav>
					</div>

					{/* Social Media Links */}
					<div className="text-center md:text-right">
						<h2 className="text-lg font-semibold mb-3">Follow Us</h2>
						<div className="flex justify-center md:justify-end space-x-4">
							<a
								href="#"
								className="text-white hover:text-blue-300 transition-colors duration-300"
							>
								<FaFacebookF className="text-2xl" />
							</a>
							<a
								href="#"
								className="text-white hover:text-blue-300 transition-colors duration-300"
							>
								<FaTwitter className="text-2xl" />
							</a>
							<a
								href="#"
								className="text-white hover:text-blue-300 transition-colors duration-300"
							>
								<FaLinkedin className="text-2xl" />
							</a>
						</div>
					</div>
				</div>

				{/* Footer Bottom Section */}
				<div className="border-t border-gray-700 pt-4 text-center">
					<p className="text-sm text-gray-400">
						&copy; {new Date().getFullYear()} Sarathi. All rights reserved.
					</p>
					<p className="mt-1 text-sm text-gray-400">
						Designed with <span className="text-red-500">&hearts;</span> by Team
						Sarathi
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
