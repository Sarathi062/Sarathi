import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa"; // Icons for social media

const AboutPage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-2xl">
				<h1 className="text-5xl font-extrabold text-center text-blue-900 mb-8">
					About Us
				</h1>
				<p className="text-lg text-gray-700 text-center mb-10 max-w-3xl mx-auto">
					Welcome to{" "}
					<span className="text-blue-600 font-semibold">SARATHI</span>, your
					gateway to expert mentorship. We are dedicated to providing a seamless
					platform for finding and connecting with mentors across various
					fields.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					<div>
						<h2 className="text-3xl font-bold text-blue-800 mb-4">
							Our Mission
						</h2>
						<p className="text-lg text-gray-600 mb-6 leading-relaxed">
							Our mission is to empower individuals by connecting them with
							experienced mentors who can guide them in career development,
							skill enhancement, and personal growth. We believe in the power of
							mentorship and strive to create an accessible platform where
							mentors and mentees can collaborate and achieve their goals.
						</p>
						<h2 className="text-3xl font-bold text-blue-800 mb-4">Our Team</h2>
						<p className="text-lg text-gray-600 leading-relaxed">
							Our team comprises professionals from various industries,
							including technology, design, data science, and business. Each
							member brings a unique perspective and expertise, ensuring our
							platform meets the highest standards of quality and user
							satisfaction.
						</p>
					</div>
					<div className="flex items-center justify-center">
						<img
							src="https://via.placeholder.com/300"
							alt="Team Image"
							className="rounded-lg shadow-lg w-full h-auto"
						/>
					</div>
				</div>

				<div className="mt-12 text-center">
					<h2 className="text-3xl font-bold text-blue-800 mb-4">Contact Us</h2>
					<p className="text-lg text-gray-600 mb-4">
						Have questions or feedback? We’d love to hear from you! Reach out to
						us at
						<a
							href="mailto:contact@yourwebsite.com"
							className="text-blue-600 hover:underline font-semibold ml-1"
						>
							contact@yourwebsite.com
						</a>
						.
					</p>
					<p className="text-lg text-gray-600">
						Follow us on social media for updates and announcements:
					</p>

					{/* Social Media Links */}
					<div className="flex justify-center space-x-6 mt-6">
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
