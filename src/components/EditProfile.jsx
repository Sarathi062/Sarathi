import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		jobTitle: "",
		company: "",
		location: "",
		linkedin: "",
		skills: "",
		experience: [{ role: "", company: "", duration: "" }],
		language: "",
		description: "",
	});

	const [error, setError] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleExperienceChange = (index, field, value) => {
		const updatedExperience = [...formData.experience];
		updatedExperience[index][field] = value;
		setFormData({ ...formData, experience: updatedExperience });
	};

	const addExperience = () => {
		setFormData({
			...formData,
			experience: [
				...formData.experience,
				{ role: "", company: "", duration: "" },
			],
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(
				"https://sarathi-backend-cgm8.onrender.com/edit-mentor-profile",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify(formData),
				}
			);

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Failed to update profile");
			}

			const resData = await res.json();
			window.alert(resData.message);
			// You can redirect after successful update
			// navigate("/some-path");
		} catch (error) {
			setError(`Error: ${error.message}`);
		}
	};

	useEffect(() => {
		const fetchProfileData = async () => {
			const token = localStorage.getItem("token");

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
					throw new Error("Error fetching profile");
				}

				const resData = await res.json();
				setFormData(resData.profile);
			} catch (error) {
				setError("Error fetching profile");
			}
		};

		fetchProfileData();
	}, []);

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
			{error && <p className="text-red-600">{error}</p>}
			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block mb-2">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded"
							required
						/>
					</div>
					<div>
						<label className="block mb-2">Password</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded"
							required
						/>
					</div>
					{[
						"firstName",
						"lastName",
						"jobTitle",
						"company",
						"location",
						"linkedin",
						"skills",
						"language",
					].map((field) => (
						<div key={field}>
							<label className="block mb-2">
								{field.charAt(0).toUpperCase() +
									field.slice(1).replace(/([A-Z])/g, " ")}
							</label>
							<input
								type="text"
								name={field}
								value={formData[field]}
								onChange={handleChange}
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>
					))}
					<div>
						<h3>Experience</h3>
						{formData.experience.map((exp, index) => (
							<div key={index} className="experience-section mb-4">
								<label>Role:</label>
								<input
									type="text"
									value={exp.role}
									onChange={(e) =>
										handleExperienceChange(index, "role", e.target.value)
									}
									className="w-full p-2 border border-gray-300 rounded mb-2"
									required
								/>
								<label>Company:</label>
								<input
									type="text"
									value={exp.company}
									onChange={(e) =>
										handleExperienceChange(index, "company", e.target.value)
									}
									className="w-full p-2 border border-gray-300 rounded mb-2"
									required
								/>
								<label>Duration:</label>
								<input
									type="text"
									value={exp.duration}
									onChange={(e) =>
										handleExperienceChange(index, "duration", e.target.value)
									}
									className="w-full p-2 border border-gray-300 rounded mb-2"
									required
								/>
							</div>
						))}
						<button
							type="button"
							onClick={addExperience}
							className="text-blue-500"
						>
							Add Another Experience
						</button>
					</div>

					<div>
						<label className="block mb-2">Description</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded"
						/>
					</div>
				</div>
				<button
					type="submit"
					className="mt-6 bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300"
				>
					Save Changes
				</button>
			</form>
		</div>
	);
};

export default EditProfile;
