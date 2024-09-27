import { useState, useEffect } from "react";
import MentorCard from "./MentorCard"; // Uncommented to import MentorCard

// eslint-disable-next-line react/prop-types
const Input = ({ className, ...props }) => (
	<input
		className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
		{...props}
	/>
);

const MentorCardPage = () => {
	const [showButton, setShowButton] = useState(false);
	const [mentors, setMentors] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const fetchMentors = async () => {
		try {
			const response = await fetch("http://localhost:3001/get-mentor-profiles");
			const data = await response.json();
			return data.mentors;
		} catch (error) {
			console.error("Error fetching mentors:", error);
		}
	};

	useEffect(() => {
		const getMentors = async () => {
			const mentorsFromServer = await fetchMentors();
			setMentors(mentorsFromServer); // mentorsFromServer is an array of mentor objects
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

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className="min-h-screen bg-blue-50 relative">
			<div className="container mx-auto p-4 lg:p-8">
				<h1 className="text-4xl md:text-5xl font-bold text-center text-blue-900 mb-8">
					Find Your Mentor
				</h1>

				<div className="mb-8 flex justify-center">
					<div className="relative w-full max-w-xl">
						<Input
							type="text"
							placeholder="Search mentors by name or expertise..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 pr-4 py-2 w-full border-2 border-blue-300 rounded-full focus:outline-none focus:border-blue-500"
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>

				{/* Mentor Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{mentors.map((mentor) => (
						<MentorCard key={mentor.id} mentor={mentor} />
					))}
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
