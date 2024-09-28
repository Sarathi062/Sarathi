import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
	const [generatedOTP, setGeneratedOTP] = useState(false);
	const [OTPVerified, setOTPVerified] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		role: "mentee",
		firstName: "",
		lastName: "",
		jobTitle: "",
		company: "",
		location: "",
		educationStatus: "",
		linkedin: "",
		skills: "",
		experience: [{ role: "", company: "", duration: "" }],
		interests: "",
		goals: "",
		otp: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;
		if (type === "file") {
			setFormData({
				...formData,
				[name]: files[0],
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	const handleExperienceChange = (index, field, value) => {
		const updatedExperience = [...formData.experience];
		updatedExperience[index][field] = value;
		setFormData({
			...formData,
			experience: updatedExperience,
		});
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
		const {
			email,
			password,
			role,
			firstName,
			lastName,
			jobTitle,
			company,
			location,
			linkedin,
			skills,
			experience,
		} = formData;
		try {
			const res = await fetch(
				"https://sarathi-backend-cgm8.onrender.com/register-mentor",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
						role,
						firstName,
						lastName,
						jobTitle,
						company,
						location,
						linkedin,
						skills,
						experience,
					}),
				}
			);
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error);
			}
			const resData = await res.json();
			window.alert(resData.message);
			setFormData({
				email: "",
				password: "",
				role: "mentor",
				firstName: "",
				lastName: "",
				jobTitle: "",
				company: "",
				location: "",
				linkedin: "",
				skills: "",
				experience: [{ role: "", company: "", duration: "" }],
				otp: "",
			});
			navigate("/login");
		} catch (error) {
			window.alert(`Error: ${error.message}`);
		}
	};
	const handleMenteeSubmit = async (e) => {
		e.preventDefault();
		const {
			email,
			password,
			role,
			firstName,
			lastName,
			skills,
			educationStatus,
			interests,
			goals,
		} = formData;
		try {
			const res = await fetch(
				"https://sarathi-backend-cgm8.onrender.com/register-mentee",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
						role,
						firstName,
						lastName,
						skills,
						educationStatus,
						interests,
						goals,
					}),
				}
			);
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error);
			}
			const resData = await res.json();
			window.alert(resData.message);
			setFormData({
				email,
				password: "",
				role: "mentee",
				firstName: "",
				lastName: "",
				skills: "",
				educationStatus: "",
				interests: "",
				goals: "",
				otp: "",
			});
			navigate("/login");
		} catch (error) {
			window.alert(`Error: ${error.message}`);
		}
	};
	const verifyOTP = async () => {
		const { email, otp } = formData;
		const res = await fetch(
			"https://sarathi-backend-cgm8.onrender.com/verify-otp",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, otp }),
			}
		);
		const data = await res.json();
		if (data.success) {
			alert("OTP verified");
			setOTPVerified(true);
		} else {
			alert("Invalid OTP");
		}
	};

	const generateOTP = async () => {
		setGeneratedOTP(true);
		const res = await fetch(
			"https://sarathi-backend-cgm8.onrender.com/sendOTP",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: formData.email }),
			}
		);
		const data = await res.json();
		if (data.success) {
			alert("OTP sent to your email");
		} else {
			alert("Error generating OTP");
		}
	};

	return (
		<div className="signup-container">
			<h2>Signup</h2>
			<form
				onSubmit={
					formData.role === "mentor" ? handleSubmit : handleMenteeSubmit
				}
			>
				<label>Email:</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<br />
				<label>Password:</label>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<br />
				<label>Sign up as:</label>
				<select name="role" value={formData.role} onChange={handleChange}>
					<option value="mentor">Mentor</option>
					<option value="mentee">Mentee</option>
				</select>
				<br />

				<label>First Name:</label>
				<input
					type="text"
					name="firstName"
					value={formData.firstName}
					onChange={handleChange}
					required
				/>
				<br />
				<label>Last Name:</label>
				<input
					type="text"
					name="lastName"
					value={formData.lastName}
					onChange={handleChange}
					required
				/>
				<br />
				{/* <label>Profile Photo:</label>
        <input
          type="file"
          name="profilePhoto"
          onChange={handleChange}
          accept="image/*"
          required
        /> */}
				<br />

				{/* Mentor-specific fields */}
				{formData.role === "mentor" && (
					<div>
						<h3>About You</h3>
						<label>Job Title:</label>
						<input
							type="text"
							name="jobTitle"
							value={formData.jobTitle}
							onChange={handleChange}
							required
						/>
						<br />
						<label>Company:</label>
						<input
							type="text"
							name="company"
							value={formData.company}
							onChange={handleChange}
							required
						/>
						<br />
						<label>Location:</label>
						<input
							type="text"
							name="location"
							value={formData.location}
							onChange={handleChange}
							required
						/>
						<br />

						<h3>Profile</h3>
						<label>LinkedIn Bio:</label>
						<input
							type="url"
							name="linkedin"
							value={formData.linkedin}
							onChange={handleChange}
							required
						/>
						<br />
						<label>Skills:</label>
						<textarea
							name="skills"
							value={formData.skills}
							onChange={handleChange}
							placeholder="List your skills separated by commas"
							required
						/>
						<br />

						<h3>Experience</h3>
						{formData.experience.map((exp, index) => (
							<div key={index} className="experience-section">
								<label>Role:</label>
								<input
									type="text"
									value={exp.role}
									onChange={(e) =>
										handleExperienceChange(index, "role", e.target.value)
									}
									required
								/>
								<br />
								<label>Company:</label>
								<input
									type="text"
									value={exp.company}
									onChange={(e) =>
										handleExperienceChange(index, "company", e.target.value)
									}
									required
								/>
								<br />
								<label>Duration:</label>
								<input
									type="text"
									value={exp.duration}
									onChange={(e) =>
										handleExperienceChange(index, "duration", e.target.value)
									}
									required
								/>
								<br />
							</div>
						))}
						<button type="button" onClick={addExperience}>
							Add Another Experience
						</button>
						<br />
					</div>
				)}

				{/* Mentee-specific fields */}
				{formData.role === "mentee" && (
					<div>
						<h3>Education and Interests</h3>
						<label>Education Status:</label>
						<input
							type="text"
							name="educationStatus"
							value={formData.educationStatus}
							onChange={handleChange}
							required
						/>
						<br />
						<label>Interests:</label>
						<textarea
							name="interests"
							value={formData.interests}
							onChange={handleChange}
							required
						/>
						<br />
						<label>Goals:</label>
						<textarea
							name="goals"
							value={formData.goals}
							onChange={handleChange}
							required
						/>
						<br />
					</div>
				)}

				{/* OTP Fields */}
				{!OTPVerified && (
					<>
						{!generatedOTP && (
							<button type="button" onClick={generateOTP}>
								Generate OTP
							</button>
						)}
						{generatedOTP && (
							<>
								<label>Enter OTP:</label>
								<input
									type="text"
									name="otp"
									value={formData.otp}
									onChange={handleChange}
									required
								/>
								<button type="button" onClick={verifyOTP}>
									Verify OTP
								</button>
							</>
						)}
					</>
				)}

				<br />
				<button type="submit" disabled={!OTPVerified}>
					Signup
				</button>
			</form>
		</div>
	);
};

export default Signup;
