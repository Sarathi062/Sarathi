import React from "react";
import Sidebar from "./Sidebar";
import MentorCard from "./MentorCard";

const MentorCardPage = () => {
	// Example mentor data
	const mentors = [
		{
			id: 1,
			name: "John Doe",
			title: "Software Engineer",
			description:
				"Specializes in full-stack development with React and Node.js.",
		},
		{
			id: 2,
			name: "Jane Smith",
			title: "Data Scientist",
			description: "Expert in machine learning and data analysis with Python.",
		},
		{
			id: 3,
			name: "Albert Johnson",
			title: "Cybersecurity Specialist",
			description: "Focuses on network security and ethical hacking.",
		},
		// Add more mentors as needed
		{
			id: 4,
			name: "Albert Johnson",
			title: "Cybersecurity Specialist",
			description: "Focuses on network security and ethical hacking.",
		},
		{
			id: 5,
			name: "Albert Johnson",
			title: "Cybersecurity Specialist",
			description: "Focuses on network security and ethical hacking.",
		},
	];

	return (
		<div className="flex">
			{/* Sidebar */}
			<Sidebar />

			{/* Main content */}
			<div className="bg-gray-100 flex-1 p-8">
				<h1 className="text-4xl font-semibold text-center text-blue-900 mb-8">
					Find Your Mentor
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{mentors.map((mentor) => (
						<MentorCard key={mentor.id} mentor={mentor} />
					))}
				</div>
			</div>
		</div>
	);
};

export default MentorCardPage;
