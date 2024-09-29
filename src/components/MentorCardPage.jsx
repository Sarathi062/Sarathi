import { useState, useEffect } from "react";
import MentorCard from "./MentorCard";

const MentorCardPage = () => {
	const [showButton, setShowButton] = useState(false);
	const [mentors, setMentors] = useState([]);

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
			setMentors(mentorsFromServer || []); // Fallback to empty array if fetch fails
		};

		getMentors();

		const handleScroll = () => {
			setShowButton(window.pageYOffset > 300);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="min-h-screen bg-gray-100 relative">
			<div className="container mx-auto p-4 lg:p-8">
				<h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-6 md:mb-8">
					Find Your Mentor
				</h1>

				{/* Mentor Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
					{mentors.length > 0 ? (
						mentors.map((mentor) => (
							<MentorCard key={mentor._id} mentor={mentor} />
						))
					) : (
						<p className="col-span-full text-center text-gray-600">
							No mentors available.
						</p>
					)}
				</div>

				{/* Back to Top Button */}
				{showButton && (
					<button
						onClick={scrollToTop}
						className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
					>
						▲ Top
					</button>
				)}
			</div>
		</div>
	);
};

export default MentorCardPage;
