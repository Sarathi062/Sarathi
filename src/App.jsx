// import React from "react";
// import Body from "./components/Body";

// function App() {
// 	return (
// 		<div>
// 			<Body />
// 		</div>
// 	);
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MentorCardPage from "./components/MentorCardPage";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";

function App() {
	return (
		<Router>
			{/* Navbar will be visible on all routes */}
			<Navbar />
			{/* Define your routes inside the Routes component */}
			<Routes>
				<Route path="/Sarathi" element={<Home />} />
				<Route path="/mentors" element={<MentorCardPage />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;

