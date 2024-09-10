import React, { useState } from "react";
import "../assets/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    experienceLevel: "",
    language: "",
    gmail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const PostData = async (e) => {
    e.preventDefault(); //This prevents the default form submission behavior, which would normally reload the page.

    const { name, title, experienceLevel, language, gmail, password } =
      formData;
    try {
      const res = await fetch("http://localhost:3000/register", {
        // This sends a POST request to the server endpoint http://localhost:3000/register
        method: "POST",
        headers: {
          "Content-Type": "application/json", // This sets the request headers to indicate that the request body contains JSON data.
        },
        body: JSON.stringify({
          //stringify is used where data needs to be send to the server. The data is an object containing the form data.
          //the data can be value or object. In this case, it is an object containing the form data.
          name,
          title,
          experienceLevel,
          language,
          gmail,
          password,
        }), //This converts the form data into a JSON string and includes it in the request body.
      });

      //If the response status is not within the range 200-299, the response is considered an error.
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      // const data = await res.json(); // Parse JSON response data as an object can be used to console.log the data or display it on the page.
      window.alert("Registration Successful");
    } catch (error) {
      window.alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" method="POST">
        <h2>Mentor Signup</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Experience Level</label>
        <select
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>

        <label>Language</label>
        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          required
        />

        <label>Gmail</label>
        <input
          type="url"
          name="gmail"
          value={formData.gmail}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" onClick={PostData}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
