import React, { useState } from 'react';
import '../assets/SignupMentee.css';
const SignupMentee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    interests: '',
    preferredLanguage: '',
    goals: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // You can integrate API call here to submit the form data to your backend
  };

  return (
    <div className="signup-mentee-container">
      <form className="signup-mentee-form" onSubmit={handleSubmit}>
        <h2>Mentee Signup</h2>
        
        <label>Name</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />

        <label>Email</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <label>Age</label>
        <input 
          type="number" 
          name="age" 
          value={formData.age} 
          onChange={handleChange} 
          required 
        />

        <label>Interests</label>
        <textarea 
          name="interests" 
          value={formData.interests} 
          onChange={handleChange} 
          required 
        />

        

        <label>Preferred Language</label>
        <input 
          type="text" 
          name="preferredLanguage" 
          value={formData.preferredLanguage} 
          onChange={handleChange} 
          required 
        />

        <label>Goals</label>
        <textarea 
          name="goals" 
          value={formData.goals} 
          onChange={handleChange} 
          required 
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignupMentee;
