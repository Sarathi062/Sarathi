// import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileMentee(props) {
	const [profile, setProfile] = useState(null);
	const navigate = useNavigate();

	const fetchProfile = async () => {
		try {
			const token = localStorage.getItem("token");

			const res = await fetch(
				"https://sarathi-backend-cgm8.onrender.com/profile-mentee",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const data = await res.json();
			// console.log(data);
			if (!res.ok) {
				navigate("/login");
			}

			setProfile(data.profile);
		} catch (error) {
			window.alert(`Error: ${error.message}`);
		}
	};

	const loadDashboard = async () => {
		const token = localStorage.getItem("token");
		try {
			const res = await fetch(
				"https://sarathi-backend-cgm8.onrender.com/dashboard-mentee",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			// const data = await res.json();
			if (!res.ok) {
				navigate("/login");
			}

			navigate("/mentee-dashboard");
		} catch (error) {
			console.error("Error loading dashboard:", error);
		}
	};

	const handleLogout = () => {
		localStorage.clear();
		navigate("/");
		props.setMenteeLogin(false);
		// props.setLogedIn(false);
		props.setlogin(false);
		props.setLogedIn(false);
	};

	useEffect(() => {
		fetchProfile();
		// console.log(profile);
	}, []);

	return (
		<div>
			<div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
				<h1 className="text-2xl font-bold">Mentee Profile</h1>
				{profile ? (
					<div>
						<p>
							<strong>Name:</strong>{" "}
							{profile.firstName + " " + profile.lastName}
						</p>
						<p>
							<strong>Email:</strong> {profile.email}
						</p>
						<p>
							<strong>Education:</strong> {profile.educationStatus}
						</p>
						<p>
							<strong>Interests:</strong> {profile.interests.join(", ")}
						</p>

						<div className="mt-4 flex space-x-4">
							{/* Button to load the dashboard */}
							<button
								onClick={loadDashboard}
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
							>
								Go to Dashboard
							</button>

							{/* Logout button */}
							<button
								onClick={handleLogout}
								className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
							>
								Logout
							</button>
						</div>
					</div>
				) : (
					<p>Loading profile...</p>
				)}
			</div>
		</div>
	);
}
