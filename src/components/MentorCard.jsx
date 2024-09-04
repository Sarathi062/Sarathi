import React from "react";

const MentorCard = ({ mentor }) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-lg font-bold">{mentor.name}</h2>
			<p className="text-sm text-gray-600">{mentor.title}</p>
			<p className="mt-2">{mentor.description}</p>
		</div>
		
	);
};

export default MentorCard;
