import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import MentorList from "./components/MentorList";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import Footer from "./components/Footer";
import MentorInfo from "./components/MentorInfo";
import Signup from "./components/Signup";
import MentorDashboard from "./components/MentorDashboard";
import MenteeDashboard from "./components/MenteeDashboard";
import ProfileMentee from "./components/ProfileMentee";
import ProfileMentor from "./components/ProfileMentor";
import SessionForm from "./components/SessionForm";
import CreateSession from "./components/CreateSession";
import EditProfile from "./components/EditProfile";
import Aimentor from "./components/Aimentor";

function App() {
  const [mentorLogin, setMentorLogin] = useState(false);
  const [menteeLogin, setMenteeLogin] = useState(false);
  const [logedIn, setLogedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogedIn(true);
      if (localStorage.getItem("role") === "mentor") {
        setMentorLogin(true);
      }
      if (localStorage.getItem("role") === "mentee") {
        setMenteeLogin(true);
      }
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar
          logedIn={logedIn}
          mentorLogin={mentorLogin}
          menteeLogin={menteeLogin}
          setMentorLogin={setMentorLogin}
          setMenteeLogin={setMenteeLogin}
          setLogedIn={setLogedIn}
        />
        <div className="flex-grow">
          <Routes>
            {/* All your routes */}
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
        <Route path="/mentors" element={<MentorList />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/mentorInfo/:id"
          element={logedIn ? <MentorInfo /> : <Navigate to="/login" />}
        />

        <Route
          path="/mentor-dashboard"
          element={
            mentorLogin ? (
              <MentorDashboard
                setMentorLogin={setMentorLogin}
                setLogedIn={setLogedIn}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/mentee-dashboard"
          element={
            menteeLogin ? (
              <MenteeDashboard
                setMenteeLogin={setMenteeLogin}
                setLogedIn={setLogedIn}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/mentor-profile"
          element={
            mentorLogin ? (
              <ProfileMentor
                setMentorLogin={setMentorLogin}
                setLogedIn={setLogedIn}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/mentee-profile"
          element={
            menteeLogin ? (
              <ProfileMentee
                setMenteeLogin={setMenteeLogin}
                setLogedIn={setLogedIn}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/create-session"
          element={mentorLogin ? <CreateSession /> : <Navigate to="/login" />}
        />

        <Route
          path="/edit-profile"
          element={mentorLogin ? <EditProfile /> : <Navigate to="/login" />}
        />

        <Route
          path="/aimentor"
          element={menteeLogin ? <Aimentor /> : <Navigate to="/login" />}
        />
        <Route path="/ai-mentor" element={<Aimentor />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
