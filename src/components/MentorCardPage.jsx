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
	];

	return (
		<div className="flex">
			{/* Sidebar */}
			<Sidebar />

			{/* Main content */}
			<div className="bg-gray-100 flex-1 p-6">
				<h1 className="text-2xl font-semibold mb-4">Our Mentors</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{mentors.map((mentor) => (
						<MentorCard key={mentor.id} mentor={mentor} />
					))}
				</div>
			</div>
		</div>
	);
};

export default MentorCardPage;
