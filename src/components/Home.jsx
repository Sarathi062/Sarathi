// import React from "react";
import { Link } from "react-router-dom";
import clock from "../assets/clock.svg";
import hat from "../assets/hat.svg";
import trophie from "../assets/trophie.svg";
import globe from "../assets/globe.svg";

const Home = (props) => {
  return (
    <div className="bg-[#f2f6fc]">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center p-6 md:px-16 lg:px-32 py-12">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-[#1F2937] sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Connect, Learn, Grow
          </h1>
          <p className="text-gray-600 mt-6 text-lg md:text-xl lg:text-2xl max-w-lg mx-auto md:mx-0">
            Find your perfect mentor or mentee and accelerate your career growth with personalized guidance.
          </p>
          <div className="mt-8 flex flex-col md:flex-row justify-center md:justify-start gap-4">
            <Link to="/mentors">
              <button className="bg-[#6d44fe] text-white py-3 px-6 rounded-lg hover:bg-[#5b3ad9] transition w-full md:w-auto shadow-lg">
                Find Mentor
              </button>
            </Link>
            {/* Conditionally render the 'Be Mentor' button */}
            {!props.mentorLogin && !props.menteeLogin && !props.IsLoggedIn && (
              <button className="bg-[#6d44fe] text-white py-3 px-6 rounded-lg hover:bg-[#5b3ad9] transition w-full md:w-auto shadow-lg">
                Be Mentor
              </button>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <img
            src={globe}
            alt="Mentor and Mentee Illustration"
            className="w-full max-w-md rounded-xl shadow-md"
          />
        </div>
      </div>

      <div className="bg-white py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-6 px-5 sm:px-16 lg:px-32">
          <div className="bg-white rounded-lg flex shadow-md p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
            <img src={clock} alt="Mentor icon" className="w-12 h-12 mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-[#1F2937] mb-2">
                40+ Mentors
              </h2>
              <p className="text-gray-600">
                Sarathi offers mentorship from experienced professionals across various fields
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg flex shadow-md p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
            <img src={hat} alt="Intern icon" className="w-12 h-12 mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-[#1F2937] mb-2">
                Former Interns
              </h2>
              <p className="text-gray-600">
                Get mentorship from past fellows and successfully land your internship.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg flex shadow-md p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
            <img
              src={trophie}
              alt="Book session icon"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold text-[#1F2937] mb-2">
                Book Your Session
              </h2>
              <p className="text-gray-600">
                Book multiple sessions with mentors at minimal prices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
