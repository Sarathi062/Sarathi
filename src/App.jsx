import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MentorCardPage from "./components/MentorCardPage";
import Home from "./components/Home";
// import Login from "./components/Login";
import About from "./components/About";
import Footer from "./components/Footer";

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
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;

