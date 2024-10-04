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
      const res = await fetch("https://sarathi-backend-cgm8.onrender.com/edit-mentor-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      const resData = await res.json();
      window.alert(resData.message);
      navigate("/mentor-dashboard");
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("https://sarathi-backend-cgm8.onrender.com/profile-mentor", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <h1 className="text-3xl font-bold text-center mb-8">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              LinkedIn
            </label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Skills
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Language
            </label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          {formData.experience.map((exp, index) => (
            <div
              key={index}
              className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg"
            >
              <label className="block text-gray-700 mb-2">Role</label>
              <input
                type="text"
                value={exp.role}
                onChange={(e) =>
                  handleExperienceChange(index, "role", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                
              />
              <label className="block text-gray-700 mb-2">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                
              />
              <label className="block text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={exp.duration}
                onChange={(e) =>
                  handleExperienceChange(index, "duration", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addExperience}
            className="text-blue-500 font-semibold mt-2"
          >
            + Add Another Experience
          </button>
        </div>

        {/* Description Section */}
        <div className="mt-8">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition-colors duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
