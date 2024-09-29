import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileMentor = ({ setMentorLogin, setLogedIn }) => {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true); // Loading state
	const [error, setError] = useState(null); // Error state
	const navigate = useNavigate();

	const fetchProfile = async () => {
		const token = localStorage.getItem("token");
		// console.log('token', token);

		if (!token) {
			navigate("/login");
			return;
		}

		try {
			const res = await fetch(
				"https://sarathi-backend-cgm8.onrender.com/profile-mentor",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!res.ok) {
				if (res.status === 403 || res.status === 401) {
					navigate("/login");
				} else {
					throw new Error(`Failed to fetch profile: ${res.statusText}`);
				}
			}

			const data = await res.json();
			setProfile(data.profile);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const loadDashboard = async () => {
		const token = localStorage.getItem("token");
		// console.log('token', token);
		if (!token) {
			navigate("/login");
			return;
		}

		try {
			const res = await fetch(
				"https://sarathi-backend-cgm8.onrender.com/dashboard-mentor",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!res.ok) {
				navigate("/login");
				return;
			}

			navigate("/mentor-dashboard");
		} catch (error) {
			console.error("Error loading dashboard:", error);
		}
	};

	const handleEditProfile = () => {
		navigate("/edit-profile");
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	const handleLogout = () => {
		localStorage.clear();
		setLogedIn(false);
		setMentorLogin(false);
		navigate("/login");
	};

	return (
		<div className="p-8 h-screen bg-gray-900 text-white overflow-auto">
			<h1 className="text-4xl font-bold mb-6">Mentor Profile</h1>

			{loading ? (
				<p className="text-center text-lg">Loading profile...</p>
			) : error ? (
				<p className="text-center text-lg text-red-500">Error: {error}</p>
			) : profile ? (
				<div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
					<h2 className="text-3xl font-semibold mb-4">Personal Information</h2>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<p>
							<strong>Name:</strong> {profile.firstName} {profile.lastName}
						</p>
						<p>
							<strong>Email:</strong> {profile.email}
						</p>
						<p>
							<strong>Job Title:</strong> {profile.jobTitle}
						</p>
						<p>
							<strong>Location:</strong> {profile.location}
						</p>
						<p>
							<strong>Languages:</strong> {profile.language}
						</p>
						<p>
							<strong>LinkedIn:</strong>{" "}
							<a
								href={profile.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-400 underline"
							>
								{profile.linkedin}
							</a>
						</p>
					</div>

					<h2 className="text-3xl font-semibold mb-4">Professional Details</h2>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<p>
							<strong>Company:</strong> {profile.company}
						</p>
						<p>
							<strong>Role:</strong> {profile.role}
						</p>
						<p>
							<strong>Skills:</strong>{" "}
							{profile.skills && profile.skills.join(", ")}
						</p>
						<p>
							<strong>Description:</strong> {profile.description}
						</p>
						<p>
							<strong>Years of Experience:</strong> {profile.yearsOfExperience}
						</p>
					</div>

					{/* Experience Section */}
					{profile.experience && profile.experience.length > 0 && (
						<div className="mb-6">
							<h2 className="text-3xl font-semibold mb-2">Experience</h2>
							<ul className="list-disc pl-5 space-y-3">
								{profile.experience.map((exp, index) => (
									<li
										key={index}
										className="border border-gray-700 p-4 rounded-md"
									>
										<p>
											<strong>Company:</strong> {exp.company}
										</p>
										<p>
											<strong>Duration:</strong> {exp.duration}
										</p>
										<p>
											<strong>Role:</strong> {exp.role}
										</p>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Buttons for actions */}
					<div className="mt-6 flex space-x-4 justify-center">
						<button
							onClick={loadDashboard}
							className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500 transition"
						>
							Go to Dashboard
						</button>
						<button
							onClick={handleLogout}
							className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-500 transition"
						>
							Logout
						</button>
						<button
							onClick={handleEditProfile}
							className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500 transition"
						>
							Edit Profile
						</button>
					</div>
				</div>
			) : (
				<p className="text-center text-lg">Profile data unavailable.</p>
			)}
		</div>
	);
};

export default ProfileMentor;
