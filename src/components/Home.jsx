import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import clock from "../assets/clock.svg";
import hat from "../assets/hat.svg";
import trophie from "../assets/trophie.svg";
import globe from "../assets/globe.svg";
const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="text-section">
          <h1>Grab Your Mentor Or Mentee</h1>
          <p>
            Book a meeting with a past intern to receive one-on-one mentoring
            and <br />
            enhance your chances of landing your ideal intern.
          </p>
          <div className="button_container">
            <Link to="/mentors">
              <button>Find Mentor</button>
            </Link>
            <button>Be Mentor</button>
          </div>
        </div>
        <div className="image-section">
          <img src={globe} alt="Mentor and Mentee Illustration" />
        </div>
      </div>

      <div className="card-container">
        <div className="card">
          <img src={clock} alt="Mentor icon" />
          <div className="card_content">
            <h1>40+ Mentors</h1>
            <p>Grabtern Contains the dream Internship and global hackathons.</p>
          </div>
        </div>
        <div className="card">
          <img src={hat} alt="Intern icon" />
          <div className="card_content">
            <h1>Former Interns</h1>
            <p>Get the mentorship from past fellows to land your internship.</p>
          </div>
        </div>
        <div className="card">
          <img src={trophie} alt="Book session icon" />
          <div className="card_content">
            <h1>Book Your Session</h1>
            <p>
              Sessions at very minimal prices, book multiple sessions with
              mentors.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
