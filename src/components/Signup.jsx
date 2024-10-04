import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const res = await fetch("https://sarathi-backend-cgm8.onrender.com/register-mentor", {
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
      });
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
      const res = await fetch("https://sarathi-backend-cgm8.onrender.com/register-mentee", {
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
      });
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
    const res = await fetch("https://sarathi-backend-cgm8.onrender.com/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
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
    const res = await fetch("https://sarathi-backend-cgm8.onrender.com/sendOTP", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email }),
    });
    const data = await res.json();
    if (data.success) {
      alert("OTP sent to your email");
    } else {
      alert("Error generating OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>
        <form
          onSubmit={formData.role === "mentor" ? handleSubmit : handleMenteeSubmit}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Sign up as:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="mentor">Mentor</option>
              <option value="mentee">Mentee</option>
            </select>
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          {/* Mentor-specific Fields */}
          {formData.role === "mentor" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Mentor Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Title:</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Company:</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">LinkedIn:</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mentee-specific Fields */}
          {formData.role === "mentee" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Mentee Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Skills:</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Interests:</label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* OTP Verification */}
          {generatedOTP && !OTPVerified && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter OTP:</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={verifyOTP}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
              >
                Verify OTP
              </button>
            </div>
          )}

          {!generatedOTP && (
            <button
              type="button"
              onClick={generateOTP}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
            >
              Generate OTP
            </button>
          )}

          <button
            type="submit"
            disabled={!OTPVerified}
            className={`w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none ${
              !OTPVerified ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {formData.role === "mentor" ? "Register as Mentor" : "Register as Mentee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
