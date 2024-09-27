import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateSession.css";

const CreateSession = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    timeFrom: "",
    timeTo: "",
    price: "",
    type: "one-to-one", // Default value
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
				"https://sarathi-backend-ten.vercel.app/create-session",
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
        console.log(data);
        alert("Session created successfully");
        navigate("/mentor-dashboard");
      }
    } catch (error) {
      console.error("Error creating session:", error);
      alert("Failed to create session. Please try again.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="form-title">Create a Session</h1>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Time From</label>
        <input
          type="time"
          name="timeFrom"
          value={formData.timeFrom}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Time To</label>
        <input
          type="time"
          name="timeTo"
          value={formData.timeTo}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="form-input"
        >
          <option value="one-to-one">One-to-One</option>
          <option value="group">Group</option>
        </select>
      </div>
      <button type="submit" className="form-button">
        Create Session
      </button>
    </form>
  );
};

export default CreateSession;
