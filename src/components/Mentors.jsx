import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";

const Mentors = () => {
	const { id } = useParams(); // Extracting the mentor ID from URL
	const [mentor, setMentor] = useState(null);
	const [sessions, setSessions] = useState([]); // State for session data
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch mentor data and session data
	useEffect(() => {
		const fetchMentorData = async () => {
			try {
				setLoading(true);

				// Fetch mentor profiles
				const mentorResponse = await fetch(
					"https://sarathi-backend-cgm8.onrender.com/get-mentor-profiles"
				);
				if (!mentorResponse.ok) {
					throw new Error("Failed to fetch mentor profiles");
				}

				const mentorData = await mentorResponse.json();
				const mentorInfo = mentorData.mentors.find(
					(mentor) => mentor._id === id
				);

				if (!mentorInfo) {
					throw new Error("Mentor not found");
				}

				setMentor(mentorInfo); // Set the mentor data

				// Fetch session data
				const sessionResponse = await fetch(
					"https://sarathi-backend-cgm8.onrender.com/get-session",
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
							mentorID: id,
						},
					}
				);

				if (!sessionResponse.ok) {
					throw new Error("Failed to fetch session data");
				}

				const sessionData = await sessionResponse.json();
				setSessions(sessionData.sessions); // Set the session data
			} catch (error) {
				console.error("Error:", error);
				setError(error.message || "An error occurred while fetching data");
			} finally {
				setLoading(false); // Ensure loading is turned off
			}
		};

		fetchMentorData();
	}, [id]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		mentor && (
			<div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
				{/* Header Section */}
				<div className="flex items-center">
					<img
						src={`https://picsum.photos/seed/${mentor._id}/200/200`}
						alt={mentor.firstName}
						className="w-32 h-32 rounded-full mr-6"
					/>
					<div>
						<h1 className="text-3xl font-bold">{mentor.firstName}</h1>
						<p className="text-gray-600">{mentor.jobTitle}</p>
						<div className="flex items-center mt-2">
							<a
								href={mentor.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline flex items-center mr-4"
							>
								<FaLinkedin className="mr-1" /> LinkedIn
							</a>
						</div>
					</div>
				</div>

				{/* Description */}
				<p className="mt-6">{mentor.description}</p>

				{/* Details and Schedule */}
				<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Details Section */}
					<div>
						<h2 className="text-xl font-semibold mb-4">Details</h2>
						<ul>
							<li>
								<strong>Language:</strong> {mentor.language}
							</li>
						</ul>
					</div>

					{/* Schedule Section */}
					<div>
						<h2 className="text-xl font-semibold mb-4">Schedule</h2>
						<table className="w-full text-left">
							<thead>
								<tr>
									<th className="border-b pb-2">Day</th>
									<th className="border-b pb-2">Availability</th>
								</tr>
							</thead>
							<tbody>
								{mentor.schedule &&
									Object.entries(mentor.schedule).map(([day, availability]) => (
										<tr key={day}>
											<td className="py-1">{day}</td>
											<td className="py-1">{availability}</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Sessions Section */}
				{sessions.length > 0 && (
					<div className="mt-6">
						<h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{sessions.map((session) => (
								<div
									key={session._id}
									className="bg-gray-100 p-4 rounded-md shadow-md"
								>
									<h3 className="text-lg font-bold">{session.title}</h3>
									<p className="text-gray-600">{session.description}</p>
									<p>
										<strong>Date:</strong> {session.date}
									</p>
									<p>
										<strong>Time:</strong> {session.timeFrom} - {session.timeTo}
									</p>
									<p>
										<strong>Type:</strong> {session.type}
									</p>
									<p>
										<strong>Price:</strong> ${session.price}
									</p>
									<div className="mt-6 text-center">
										<Link
											to="/session-form"
											className="text-blue-600 hover:underline"
										>
											<button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300">
												Book a Session
											</button>
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Call to Action */}
			</div>
		)
	);
};

export default Mentors;
