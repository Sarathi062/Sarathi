import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";
import MentorCardPage from "./MentorCardPage";
import Home from "./Home";
import Login from "./Login";
import About from "./About";
const Body = () => {
  return (
    <>
      <Router>
        <Navbar />
        {/* <MentorCardPage /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentors" element={<MentorCardPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default Body;
