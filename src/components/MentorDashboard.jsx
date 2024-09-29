import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MentorDashboard.css";
import SessionCard from "./SessionCard.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

const MentorDashboard = () => {
	// const [dashboardData, setDashboardData] = useState(null);
	const [sessionRequests, setSessionRequests] = useState([]);
	const [createdSessions, setCreatedSessions] = useState([]);
	const [loading, setLoading] = useState(true); // Loading state
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();
	const [calendarId, setCalendarId] = useState(null);

	const fetchDashboardData = async () => {
		try {
			const token = localStorage.getItem("token");
			const res = await fetch(
				"https://sarathi-backend-cgm8.onrender.com/dashboard-mentor",
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
			setError("Failed to load dashboard data.", error);
			setLoading(false);
		}
	};

	const fetchCreatedSessions = async () => {
		const token = localStorage.getItem("token");
		try {
			const res = await fetch(
				"https://sarathi-backend-cgm8.onrender.com/get-session-mentor",
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
			setError("Error fetching created sessions.", error);
		}
	};
	const fetchUserCalendar = async () => {
		const token = localStorage.getItem("token");
		try {
			const res = await fetch(
				"https://sarathi-backend-cgm8.onrender.com/user/calendar",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			if (!res.ok) {
				throw new Error("Error fetching user calendar.");
			}
			const data = await res.json();
			setCalendarId(data.calendarId);
		} catch (error) {
			setError("", error);
		}
	};
	useEffect(() => {
		fetchDashboardData();
		fetchCreatedSessions();
		fetchUserCalendar();
	}, []);
	function openGoogleAuthPopup() {
		// Call your back-end to get the OAuth URL
		fetch("https://sarathi-backend-cgm8.onrender.com/auth")
			.then((response) => response.json())
			.then((data) => {
				const authUrl = data.url;

				// Open the URL in a popup
				const popup = window.open(
					authUrl,
					"googleAuthPopup",
					"width=500,height=600"
				);

				// Listen for the message from the popup (authentication success)
				const handleAuthMessage = (event) => {
					if (event.data.success) {
						// Close the popup
						if (popup && !popup.closed) {
							popup.close();
						}

						// Navigate to the dashboard after a brief delay
						setTimeout(() => {
							navigate("/mentor-dashboard");
						}, 100); // Adjust the timeout as necessary
					}
				};

				window.addEventListener("message", handleAuthMessage, { once: true }); // Listen once
			})
			.catch((error) => {
				console.error("Error fetching OAuth URL:", error);
			});
	}
	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredSessions = createdSessions.filter((session) =>
		session.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const addEvent = async () => {
		const res = await fetch(
			"https://sarathi-backend-cgm8.onrender.com/add-event",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					title: "Event Title",
					description: "Event Description",
					start: "2024-09-01T10:00:00",
					end: "2024-09-01T11:00:00",
				}),
			}
		);
		const data = await res.json();
		console.log(data);
		if (res.ok) {
			alert("Event added to calendar");
		} else {
			alert("Error adding event to calendar");
		}
	};

	const handleApproveRequest = async (requestId) => {
		try {
			const token = localStorage.getItem("token");
			const res = await fetch(
				`https://sarathi-backend-cgm8.onrender.com/approve-request/${requestId}`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Unknown error occurred");
			} else {
				alert("Session request approved successfully");
				fetchDashboardData();
			}
		} catch (error) {
			console.error("Error approving session request:", error);
			alert("Failed to approve session request. Please try again.");
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
							src={`https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=America/Los_Angeles`}
							style={{ border: 0 }}
							width="100%"
							height="400"
							title="User's Google Calendar"
						></iframe>

						<button
							style={{ background: "green" }}
							onClick={openGoogleAuthPopup}
						>
							Authenticate
						</button>

						<button style={{ background: "red" }} onClick={addEvent}>
							Add Event to calendar
						</button>
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
									<SessionCard key={session.id} session={session} />
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
