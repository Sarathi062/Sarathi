import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileMentor = ({ setMentorLogin, setLogedIn }) => {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const fetchProfile = async () => {
		const token = localStorage.getItem("token");

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

	useEffect(() => {
		fetchProfile();
	}, []);

	const handleEditProfile = () => {
		navigate("/edit-profile");
	};

	const handleLogout = () => {
		localStorage.clear();
		setLogedIn(false);
		setMentorLogin(false);
		navigate("/login");
	};

	return (
		<div className="p-8 h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-black text-white overflow-auto">
			<h1 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
				Mentor Profile
			</h1>

			{loading ? (
				<p className="text-center text-lg text-blue-400">Loading profile...</p>
			) : error ? (
				<p className="text-center text-lg text-red-500">Error: {error}</p>
			) : profile ? (
				<div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto border-2 border-purple-600">
					<h2 className="text-3xl font-semibold mb-4 text-yellow-300">Personal Information</h2>
					<div className="grid grid-cols-2 gap-4 mb-4 text-blue-200">
						<p>
							<strong className="text-yellow-300">Name:</strong> {profile.firstName} {profile.lastName}
						</p>
						<p>
							<strong className="text-yellow-300">Email:</strong> {profile.email}
						</p>
						<p>
							<strong className="text-yellow-300">Job Title:</strong> {profile.jobTitle}
						</p>
						<p>
							<strong className="text-yellow-300">Location:</strong> {profile.location}
						</p>
						<p>
							<strong className="text-yellow-300">Languages:</strong> {profile.language}
						</p>
						<p>
							<strong className="text-yellow-300">LinkedIn:</strong>{" "}
							<a
								href={profile.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="text-green-400 underline hover:text-green-300"
							>
								{profile.linkedin}
							</a>
						</p>
					</div>

					<h2 className="text-3xl font-semibold mb-4 text-yellow-300">Professional Details</h2>
					<div className="grid grid-cols-2 gap-4 mb-4 text-blue-200">
						<p>
							<strong className="text-yellow-300">Company:</strong> {profile.company}
						</p>
						<p>
							<strong className="text-yellow-300">Role:</strong> {profile.role}
						</p>
						<p>
							<strong className="text-yellow-300">Skills:</strong>{" "}
							{profile.skills && profile.skills.join(", ")}
						</p>
						<p>
							<strong className="text-yellow-300">Description:</strong> {profile.description}
						</p>
						<p>
							<strong className="text-yellow-300">Years of Experience:</strong> {profile.yearsOfExperience}
						</p>
					</div>

					{/* Experience Section */}
					{profile.experience && profile.experience.length > 0 && (
						<div className="mb-6">
							<h2 className="text-3xl font-semibold mb-2 text-yellow-300">Experience</h2>
							<ul className="list-disc pl-5 space-y-3 text-blue-200">
								{profile.experience.map((exp, index) => (
									<li
										key={index}
										className="border border-purple-700 p-4 rounded-md bg-gray-700"
									>
										<p>
											<strong className="text-yellow-300">Company:</strong> {exp.company}
										</p>
										<p>
											<strong className="text-yellow-300">Duration:</strong> {exp.duration}
										</p>
										<p>
											<strong className="text-yellow-300">Role:</strong> {exp.role}
										</p>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Buttons for actions */}
					<div className="mt-6 flex space-x-4 justify-center">
						<button
							onClick={() => navigate("/mentor-dashboard")}
							className="bg-gradient-to-r from-green-600 to-green-400 text-white px-6 py-2 rounded hover:from-green-500 hover:to-green-300 transition"
						>
							Go to Dashboard
						</button>
						<button
							onClick={handleLogout}
							className="bg-gradient-to-r from-red-600 to-red-400 text-white px-6 py-2 rounded hover:from-red-500 hover:to-red-300 transition"
						>
							Logout
						</button>
						<button
							onClick={handleEditProfile}
							className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded hover:from-blue-500 hover:to-blue-300 transition"
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
