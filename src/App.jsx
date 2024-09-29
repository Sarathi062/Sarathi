import { useState,useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
	useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import MentorCardPage from "./components/MentorCardPage";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import Footer from "./components/Footer";
import Mentors from "./components/Mentors";
import Signup from "./components/Signup";
import MentorDashboard from "./components/MentorDashboard";
import MenteeDashboard from "./components/MenteeDashboard";
import ProfileMentee from "./components/ProfileMentee";
import ProfileMentor from "./components/ProfileMentor";
import SessionForm from "./components/SessionForm";
import CreateSession from "./components/CreateSession";
import EditProfile from "./components/EditProfile";

function App() {
	const [mentorLogin, setMentorLogin] = useState(false);
	const [menteeLogin, setMenteeLogin] = useState(false);
	const [logedIn, setLogedIn] = useState(false);

	// Check localStorage on component mount
	useEffect(() => {
		const storedMentorLogin = localStorage.getItem("mentorLogin") === "true";
		const storedMenteeLogin = localStorage.getItem("menteeLogin") === "true";
		const storedLoggedIn = localStorage.getItem("logedIn") === "true";

		if (storedLoggedIn) {
			setLogedIn(true);
			setMentorLogin(storedMentorLogin);
			setMenteeLogin(storedMenteeLogin);
		}
	}, []);


	// Move Router here to wrap the whole component
	return (
		<Router>
			{/* Navbar will be visible on all routes */}
			<Navbar
				logedIn={logedIn}
				mentorLogin={mentorLogin}
				menteeLogin={menteeLogin}
			/>
			{/* Define your routes inside the Routes component */}
			<Content
				logedIn={logedIn}
				mentorLogin={mentorLogin}
				menteeLogin={menteeLogin}
				setMentorLogin={setMentorLogin}
				setMenteeLogin={setMenteeLogin}
				setLogedIn={setLogedIn}
			/>
		</Router>
	);
}

// Move useLocation and footer conditional logic into the Content component
const Content = ({
	logedIn,
	mentorLogin,
	menteeLogin,
	setMentorLogin,
	setMenteeLogin,
	setLogedIn,
}) => {
	const location = useLocation();
	// Define routes where the Footer should be displayed
	const showFooterRoutes = ["/", "/about", "/mentors"];
	const shouldShowFooter = showFooterRoutes.includes(location.pathname);

	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<Home
							mentorLogin={mentorLogin}
							menteeLogin={menteeLogin}
							logedIn={logedIn}
						/>
					}
				/>
				<Route path="/mentors" element={<MentorCardPage />} />
				<Route path="/about" element={<About />} />
				<Route
					path="/login"
					element={
						!logedIn ? (
							<Login
								setMentorLogin={setMentorLogin}
								setMenteeLogin={setMenteeLogin}
								setLogedIn={setLogedIn}
							/>
						) : (
							<Navigate
								to={menteeLogin ? "/mentee-dashboard" : "/mentor-dashboard"}
							/>
						)
					}
				/>
				<Route
					path="/signup"
					element={
						!logedIn ? (
							<Signup />
						) : (
							<Navigate
								to={menteeLogin ? "/mentee-dashboard" : "/mentor-dashboard"}
							/>
						)
					}
				/>

				<Route
					path="/Mentors/:id"
					element={logedIn ? <Mentors /> : <Navigate to="/login" />}
				/>

				{logedIn && mentorLogin && (
					<Route
						path="/mentor-dashboard"
						element={
							<MentorDashboard
								setMentorLogin={setMentorLogin}
								setLogedIn={setLogedIn}
							/>
						}
					/>
				)}

				{logedIn && menteeLogin && (
					<Route
						path="/mentee-dashboard"
						element={
							<MenteeDashboard
								setMenteeLogin={setMenteeLogin}
								setLogedIn={setLogedIn}
							/>
						}
					/>
				)}
				{logedIn && mentorLogin && (
					<Route
						path="/mentor-profile"
						element={
							<ProfileMentor
								setMentorLogin={setMentorLogin}
								setLogedIn={setLogedIn}
							/>
						}
					/>
				)}

				{logedIn && menteeLogin && (
					<Route
						path="/mentee-profile"
						element={
							<ProfileMentee
								setMenteeLogin={setMenteeLogin}
								setLogedIn={setLogedIn}
							/>
						}
					/>
				)}

				{logedIn && <Route path="/session-form" element={<SessionForm />} />}
				{logedIn && mentorLogin && (
					<Route path="/create-session" element={<CreateSession />} />
				)}

				{logedIn && mentorLogin && (
					<Route path="/edit-profile" element={<EditProfile />} />
				)}
			</Routes>

			{/* Conditionally render Footer */}
			{shouldShowFooter && <Footer />}
		</>
	);
};

export default App;
