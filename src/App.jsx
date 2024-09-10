import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MentorCardPage from "./components/MentorCardPage";
import Home from "./components/Home";
// import Login from "./components/Login";
import About from "./components/About";
import Footer from "./components/Footer";
import Mentors from "./components/Mentors";
import Signup from "./components/Signup";
import SignupMentee from "./components/SignupMentee";
function App() {
	return (
		<Router>
			{/* Navbar will be visible on all routes */}
			<Navbar />
			{/* Define your routes inside the Routes component */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/mentors" element={<MentorCardPage />} />
				<Route path="/about" element={<About />} />
				{/* <Route path="/login" element={<Login />} /> */}
				{/* <Route path="/login" element={<Login />} /> */}
				<Route path="/Mentors/:id" element={<Mentors />} />
				<Route path="/Signup" element={<Signup />} />
				<Route path="/SignupMentee" element={<SignupMentee />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;

