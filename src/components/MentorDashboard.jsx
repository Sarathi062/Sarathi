import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MentorDashboard.css";
import SessionCard from "./SessionCard.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx"; // New loading spinner component

const MentorDashboard = () => {
	// const [dashboardData, setDashboardData] = useState(null);
	const [sessionRequests, setSessionRequests] = useState([]);
	const [createdSessions, setCreatedSessions] = useState([]);
	const [loading, setLoading] = useState(true); // Loading state
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState(""); // For searching sessions
	const navigate = useNavigate();

	const fetchDashboardData = async () => {
		try {
			const token = localStorage.getItem("token");
			const res = await fetch(
				"https://sarathi-backend-ten.vercel.app/dashboard-mentor",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const data = await res.json();
			if (!res.ok) {
				navigate("/login");
			} else {
				// setDashboardData(data);
				setSessionRequests(data.sessionRequests || []);
				setCreatedSessions(data.createdSessions || []);
				setLoading(false); // Stop loading after data is fetched
			}
		} catch (error) {
			setError("Failed to load dashboard data.",error);
			setLoading(false);
		}
	};

	const fetchCreatedSessions = async () => {
		const token = localStorage.getItem("token");
		try {
			const res = await fetch(
				"https://sarathi-backend-ten.vercel.app/get-session-mentor",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Unknown error occurred");
			} else {
				setCreatedSessions(data.sessions);
			}
		} catch (error) {
			setError("Error fetching created sessions.",error);
		}
	};

	useEffect(() => {
		fetchDashboardData();
		fetchCreatedSessions();
	}, []);

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredSessions = createdSessions.filter((session) =>
		session.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleApproveRequest = async (requestId) => {
		try {
			const token = localStorage.getItem("token");
			const res = await fetch(
				`https://sarathi-backend-ten.vercel.app/approve-request/${requestId}`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (res.ok) {
				// Update the session requests state after approval
				setSessionRequests((prevRequests) =>
					prevRequests.filter((request) => request.id !== requestId)
				);
			}
		} catch (error) {
			setError("Error approving session request.",error);
		}
	};

	return (
		<div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
			<h1 className="text-2xl font-bold">Mentor Dashboard</h1>

			{/* Create Session Button */}
			<button
				className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
				onClick={() => navigate("/create-session")}
			>
				Create Session
			</button>

			{/* Error handling */}
			{error && <p className="text-red-500">{error}</p>}

			{/* Loading state */}
			{loading ? (
				<LoadingSpinner /> // Custom spinner component
			) : (
				<div className="flex flex-row space-x-4">
					{/* Left column - Session Requests */}
					<div className="w-1/2 bg-gray-100 p-4 rounded-md">
						<h2 className="text-xl font-bold mb-4">Session Requests</h2>
						{sessionRequests.length > 0 ? (
							<ul>
								{sessionRequests.map((request, index) => (
									<li key={index} className="mb-4">
										<div className="flex justify-between">
											<span>
												{request.menteeName} - {request.sessionTime}
											</span>
											<button
												onClick={() => handleApproveRequest(request.id)}
												className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
											>
												Approve
											</button>
										</div>
									</li>
								))}
							</ul>
						) : (
							<p>No pending session requests</p>
						)}
					</div>

					{/* Right column - Created Sessions */}
					<div className="w-1/2">
						<iframe
							src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=your_timezone"
							style={{ border: 0 }}
							width="100%"
							height="400"
							frameBorder="0"
							scrolling="no"
							title="Google Calendar"
						></iframe>

						{/* Search Bar */}
						<div className="mt-4">
							<input
								type="text"
								value={searchQuery}
								onChange={handleSearch}
								placeholder="Search sessions..."
								className="w-full p-2 border border-gray-300 rounded-md mb-4"
							/>
						</div>

						{/* Session Cards */}
						<div className="mt-4">
							<h2 className="text-xl font-bold mb-4">Created Sessions</h2>
							{filteredSessions.length > 0 ? (
								filteredSessions.map((session) => (
									<SessionCard key={session._id} session={session} />
								))
							) : (
								<p>No created sessions found</p>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MentorDashboard;
