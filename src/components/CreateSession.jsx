import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateSession = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		start: "",
		end: "",
		price: "",
		type: "one-to-one", // Default value
	});
	const navigate = useNavigate();

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		try {
			const res = await fetch(
				"https://sarathi-backend-cgm8.onrender.com/create-session",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				}
			);
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Unknown error occurred");
			} else {
				alert("Session created successfully");
				navigate("/mentor-dashboard");
			}
		} catch (error) {
			console.error("Error creating session:", error);
			alert("Failed to create session. Please try again.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-6 ">
			<div className="w-full max-w-2xl  bg-gray-50  rounded-xl  p-8 space-y-6">
				<h1 className="text-3xl font-bold text-center text-blue-700">
					Create a Session
				</h1>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<label className="block text-lg font-medium text-gray-700">
							Title
						</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
							required
						/>
					</div>

					<div className="space-y-2">
						<label className="block text-lg font-medium text-gray-700">
							Description
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
							required
						/>
					</div>

					<div className="space-y-2">
						<label className="block text-lg font-medium text-gray-700">
							Start Time
						</label>
						<input
							type="datetime-local"
							name="start"
							value={formData.start}
							onChange={handleChange}
							className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
							required
						/>
					</div>

					<div className="space-y-2">
						<label className="block text-lg font-medium text-gray-700">
							End Time
						</label>
						<input
							type="datetime-local"
							name="end"
							value={formData.end}
							onChange={handleChange}
							className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
							required
						/>
					</div>

					<div className="space-y-2">
						<label className="block text-lg font-medium text-gray-700">
							Price
						</label>
						<input
							type="number"
							name="price"
							value={formData.price}
							onChange={handleChange}
							className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
							required
						/>
					</div>

					<div className="space-y-2">
						<label className="block text-lg font-medium text-gray-700">
							Type
						</label>
						<select
							name="type"
							value={formData.type}
							onChange={handleChange}
							className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
							required
						>
							<option value="one-to-one">One-to-One</option>
							<option value="group">Group</option>
						</select>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
					>
						Create Session
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateSession;
