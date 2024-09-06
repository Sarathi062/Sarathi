import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MentorCard from "./MentorCard";
import { mentors } from "../utils/constants";

const MentorCardPage = () => {
  // State for search filters
  const [search, setSearch] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [sessionTiming, setSessionTiming] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");

  

  // Filter mentors based on search criteria
  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = search === "" || mentor.name.toLowerCase().includes(search.toLowerCase()) || mentor.title.toLowerCase().includes(search.toLowerCase()) || mentor.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesSessionType = sessionType === "" || mentor.sessionType === sessionType;
    
    const matchesExperienceLevel = experienceLevel === "" || mentor.experienceLevel === experienceLevel;
    
    const matchesLocation = location === "" || mentor.location.toLowerCase().includes(location.toLowerCase());
    
    const matchesLanguage = language === "" || mentor.language.toLowerCase().includes(language.toLowerCase());

    // For simplicity, skipping sessionTiming here as it's not provided in mentors array, but you can add a comparison based on actual data.
    
    return matchesSearch && matchesSessionType && matchesExperienceLevel && matchesLocation && matchesLanguage;
  });

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-4xl font-semibold text-center text-blue-900 mb-8">
          Find Your Mentor
        </h1>

        {/* Filter section */}
        <div className="filter mb-8 bg-white shadow-lg p-6 rounded-lg">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Search input */}
            <div className="flex items-center flex-grow">
              <input
                type="text"
                placeholder="Search mentors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300">
                Search
              </button>
            </div>

            {/* Session type */}
            <div className="flex items-center">
              <label htmlFor="sessionType" className="mr-2 font-semibold text-gray-600">
                Session Type:
              </label>
              <select
                id="sessionType"
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="">Any</option>
                <option value="one-to-one">One-to-One</option>
                <option value="group">Group</option>
              </select>
            </div>

            {/* Experience level */}
            <div className="flex items-center">
              <label htmlFor="experienceLevel" className="mr-2 font-semibold text-gray-600">
                Experience Level:
              </label>
              <select
                id="experienceLevel"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="">Any</option>
                <option value="junior">Junior</option>
                <option value="mid-level">Mid-Level</option>
                <option value="senior">Senior</option>
              </select>
            </div>

            {/* Location */}
            <div className="flex items-center">
              <label htmlFor="location" className="mr-2 font-semibold text-gray-600">
                Location:
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            {/* Language */}
            <div className="flex items-center">
              <label htmlFor="language" className="mr-2 font-semibold text-gray-600">
                Language:
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="">Any</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mentor cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorCardPage;
