import React, { useState, useEffect } from "react";
import MentorCard from "./MentorCard";
import { mentors } from "../utils/constants";

const MentorCardPage = () => {
	const [search, setSearch] = useState("");
	const [sessionType, setSessionType] = useState("");
	const [experienceLevel, setExperienceLevel] = useState("");
	const [language, setLanguage] = useState("");
	const [showButton, setShowButton] = useState(false); // State for showing the "Back to Top" button

	// Filter mentors based on search criteria
	const filteredMentors = mentors.filter((mentor) => {
		const matchesSearch =
			search === "" ||
			mentor.name.toLowerCase().includes(search.toLowerCase()) ||
			mentor.title.toLowerCase().includes(search.toLowerCase()) ||
			mentor.description.toLowerCase().includes(search.toLowerCase());

		const matchesSessionType =
			sessionType === "" || mentor.sessionType === sessionType;
		const matchesExperienceLevel =
			experienceLevel === "" || mentor.experienceLevel === experienceLevel;
		const matchesLanguage =
			language === "" ||
			mentor.language.toLowerCase().includes(language.toLowerCase());

		return (
			matchesSearch &&
			matchesSessionType &&
			matchesExperienceLevel &&
			matchesLanguage
		);
	});

	// Show the "Back to Top" button after scrolling down
	useEffect(() => {
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

	// Scroll back to the top of the page
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className="min-h-screen bg-gray-50 relative">
			<div className="container mx-auto p-4 lg:p-8">
				<h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-6 md:mb-8">
					Find Your Mentor
				</h1>

				{/* Filter Section */}
				<div className="bg-white p-4 md:p-6 rounded-lg shadow-lg mb-6 md:mb-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
						{/* Search */}
						<div className="col-span-1 md:col-span-2">
							<input
								type="text"
								placeholder="Search by name, title, or keyword"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						{/* Session Type */}
						<div className="col-span-1">
							<select
								value={sessionType}
								onChange={(e) => setSessionType(e.target.value)}
								className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="">Session Type</option>
								<option value="one-to-one">One-to-One</option>
								<option value="group">Group</option>
							</select>
						</div>

						{/* Experience Level */}
						<div className="col-span-1">
							<select
								value={experienceLevel}
								onChange={(e) => setExperienceLevel(e.target.value)}
								className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="">Experience Level</option>
								<option value="junior">Junior</option>
								<option value="mid-level">Mid-Level</option>
								<option value="senior">Senior</option>
							</select>
						</div>

						{/* Language */}
						<div className="col-span-1">
							<select
								value={language}
								onChange={(e) => setLanguage(e.target.value)}
								className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="">Language</option>
								<option value="english">English</option>
								<option value="spanish">Spanish</option>
								<option value="french">French</option>
								<option value="german">German</option>
							</select>
						</div>
					</div>
				</div>

				{/* Mentor Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredMentors.length > 0 ? (
						filteredMentors.map((mentor) => (
							<MentorCard key={mentor.id} mentor={mentor} />
						))
					) : (
						<p className="text-center text-gray-500 col-span-full">
							No mentors found.
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
