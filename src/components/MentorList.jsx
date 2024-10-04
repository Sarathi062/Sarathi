import React, { useState, useEffect } from "react";
import MentorCard from "./MentorCard"; // Assuming MentorCard is the component to display each mentor

const MentorCardPage = () => {
	const [showButton, setShowButton] = useState(false);
	const [mentors, setMentors] = useState([]);
	const [filteredMentors, setFilteredMentors] = useState([]);
	const [searchName, setSearchName] = useState("");
	const [sessionType, setSessionType] = useState("");

	// Fetch mentors from the server
	const fetchMentors = async () => {
		try {
			const response = await fetch(
				"https://sarathi-backend-cgm8.onrender.com/get-mentor-profiles"
			);
			const data = await response.json();
			return data.mentors;
		} catch (error) {
			console.error("Error fetching mentors:", error);
		}
	};

	useEffect(() => {
		const getMentors = async () => {
			const mentorsFromServer = await fetchMentors();
			setMentors(mentorsFromServer); // Set all mentors
			setFilteredMentors(mentorsFromServer); // Initially show all mentors
		};

		getMentors();

		const handleScroll = () => {
			if (window.pageYOffset > 300) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Function to filter mentors based on name and session type
	useEffect(() => {
		const filterMentors = () => {
			let filtered = mentors;

			// Filter by name
			if (searchName) {
				filtered = filtered.filter((mentor) =>
					mentor.firstName.toLowerCase().includes(searchName.toLowerCase())
				);
			}

			// Filter by session type
			if (sessionType) {
				filtered = filtered.filter(
					(mentor) =>
						mentor.sessions &&
						mentor.sessions.some((session) => session.type === sessionType)
				);
			}

			setFilteredMentors(filtered);
		};

		filterMentors();
	}, [searchName, sessionType, mentors]);

	// Scroll to top functionality
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 relative">
			<div className="container mx-auto p-6 lg:p-10">
				<h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-800 mb-8">
					Find Your Perfect Mentor
				</h1>

				{/* Search and Filter Options */}
				<div className="mb-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
					{/* Search by name */}
					<input
						type="text"
						placeholder="Search by mentor's name"
						className="p-3 border-2 border-blue-300 rounded-lg shadow-sm w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
						value={searchName}
						onChange={(e) => setSearchName(e.target.value)}
					/>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{filteredMentors.length > 0 ? (
						filteredMentors.map((mentor) => (
							<MentorCard key={mentor._id} mentor={mentor} />
						))
					) : (
						<p className="text-center text-gray-500 w-full">
							No mentors found.
						</p>
					)}
				</div>

				{/* Back to Top Button */}
				{showButton && (
					<button
						onClick={scrollToTop}
						className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-xl hover:bg-blue-700 transition-transform duration-300 transform hover:scale-110"
					>
						▲ Top
					</button>
				)}
			</div>
		</div>
	);
};

export default MentorCardPage;
