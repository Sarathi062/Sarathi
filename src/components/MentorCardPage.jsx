import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MentorCard from "./MentorCard";

const MentorCardPage = () => {
  // State for search filters
  const [search, setSearch] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [sessionTiming, setSessionTiming] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");

  // Example mentor data
  const mentors = [
	{ id: 1, name: "John Doe", title: "Software Engineer", description: "Specializes in full-stack development with React and Node.js.", sessionType: "one-to-one", experienceLevel: "mid-level", location: "New York", language: "English" },
	{ id: 2, name: "Jane Smith", title: "Data Scientist", description: "Expert in machine learning and data analysis with Python.", sessionType: "group", experienceLevel: "senior", location: "San Francisco", language: "English" },
	{ id: 3, name: "Albert Johnson", title: "Cybersecurity Specialist", description: "Focuses on network security and ethical hacking.", sessionType: "one-to-one", experienceLevel: "mid-level", location: "London", language: "English" },
	{ id: 4, name: "Emily Davis", title: "UX/UI Designer", description: "Designs user-friendly interfaces with Figma and Sketch.", sessionType: "group", experienceLevel: "junior", location: "Berlin", language: "German" },
	{ id: 5, name: "Michael Brown", title: "DevOps Engineer", description: "Experienced in CI/CD, Docker, and cloud infrastructure.", sessionType: "one-to-one", experienceLevel: "senior", location: "Seattle", language: "English" },
	{ id: 6, name: "Sophia Wilson", title: "Frontend Developer", description: "Builds modern web apps using React and Vue.js.", sessionType: "group", experienceLevel: "mid-level", location: "Toronto", language: "English" },
	{ id: 7, name: "David Lee", title: "AI Engineer", description: "Works with AI and machine learning models using TensorFlow.", sessionType: "one-to-one", experienceLevel: "senior", location: "Seoul", language: "Korean" },
	{ id: 8, name: "Chris Kim", title: "Mobile Developer", description: "Creates iOS and Android apps using Flutter and React Native.", sessionType: "group", experienceLevel: "mid-level", location: "Los Angeles", language: "English" },
	{ id: 9, name: "Megan Taylor", title: "Project Manager", description: "Leads software development projects using Agile methodologies.", sessionType: "one-to-one", experienceLevel: "senior", location: "Chicago", language: "English" },
	{ id: 10, name: "Joshua White", title: "Database Administrator", description: "Manages databases with MySQL, MongoDB, and Oracle.", sessionType: "group", experienceLevel: "mid-level", location: "Austin", language: "English" },
	{ id: 11, name: "Ella Martinez", title: "Product Manager", description: "Manages product development and roadmaps.", sessionType: "one-to-one", experienceLevel: "mid-level", location: "Mexico City", language: "Spanish" },
	{ id: 12, name: "Lucas Anderson", title: "Blockchain Developer", description: "Builds decentralized apps and smart contracts.", sessionType: "group", experienceLevel: "mid-level", location: "Zurich", language: "English" },
	{ id: 13, name: "Olivia Thomas", title: "SEO Specialist", description: "Improves search engine rankings and online visibility.", sessionType: "one-to-one", experienceLevel: "junior", location: "Paris", language: "French" },
	{ id: 14, name: "Andrew Scott", title: "Backend Developer", description: "Specializes in server-side development with Node.js and Python.", sessionType: "group", experienceLevel: "mid-level", location: "Sydney", language: "English" },
	{ id: 15, name: "Isabella Rodriguez", title: "Marketing Strategist", description: "Develops digital marketing campaigns.", sessionType: "one-to-one", experienceLevel: "mid-level", location: "Barcelona", language: "Spanish" },
	{ id: 16, name: "Matthew Clark", title: "Cloud Architect", description: "Designs scalable cloud solutions using AWS and Azure.", sessionType: "group", experienceLevel: "senior", location: "Miami", language: "English" },
	{ id: 17, name: "Chloe Evans", title: "AI Researcher", description: "Focuses on research and development of AI algorithms.", sessionType: "one-to-one", experienceLevel: "senior", location: "Cambridge", language: "English" },
	{ id: 18, name: "Ethan Walker", title: "Software Tester", description: "Ensures software quality with automated and manual testing.", sessionType: "group", experienceLevel: "mid-level", location: "Melbourne", language: "English" },
	{ id: 19, name: "Ava King", title: "Data Analyst", description: "Analyzes data and generates business insights using Excel and PowerBI.", sessionType: "one-to-one", experienceLevel: "junior", location: "Manchester", language: "English" },
	{ id: 20, name: "Henry Turner", title: "Salesforce Developer", description: "Customizes and develops applications on the Salesforce platform.", sessionType: "group", experienceLevel: "mid-level", location: "Boston", language: "English" },
	{ id: 21, name: "Grace Peterson", title: "Cloud Consultant", description: "Advises companies on AWS cloud adoption strategies.", sessionType: "one-to-one", experienceLevel: "senior", location: "Stockholm", language: "English" },
	{ id: 22, name: "Daniel Green", title: "Embedded Systems Engineer", description: "Specializes in embedded systems and IoT device programming.", sessionType: "group", experienceLevel: "mid-level", location: "Helsinki", language: "Finnish" },
	{ id: 23, name: "Victoria Brown", title: "Digital Marketing Manager", description: "Develops social media and SEO strategies for businesses.", sessionType: "one-to-one", experienceLevel: "mid-level", location: "Rome", language: "Italian" },
	{ id: 24, name: "James Walker", title: "Full-Stack Developer", description: "Expert in web development using JavaScript and Python.", sessionType: "group", experienceLevel: "senior", location: "Vancouver", language: "English" },
	{ id: 25, name: "Lily Roberts", title: "Data Engineer", description: "Designs data pipelines and systems for large-scale data processing.", sessionType: "one-to-one", experienceLevel: "mid-level", location: "Singapore", language: "English" },
	{ id: 26, name: "Sam Phillips", title: "Mobile Developer", description: "Builds Android apps using Kotlin and Flutter.", sessionType: "group", experienceLevel: "junior", location: "Bangalore", language: "English" },
	{ id: 27, name: "Anna Bennett", title: "Machine Learning Engineer", description: "Creates predictive models with Python and TensorFlow.", sessionType: "one-to-one", experienceLevel: "mid-level", location: "Mumbai", language: "English" },
	{ id: 28, name: "Mark Johnson", title: "AI Research Scientist", description: "Develops machine learning algorithms for healthcare.", sessionType: "group", experienceLevel: "senior", location: "Beijing", language: "Mandarin" },
	{ id: 29, name: "Catherine Scott", title: "Blockchain Architect", description: "Designs blockchain infrastructure and smart contracts.", sessionType: "one-to-one", experienceLevel: "senior", location: "Dubai", language: "Arabic" },
	{ id: 30, name: "Tom Anderson", title: "Software Architect", description: "Designs high-level software systems for large enterprises.", sessionType: "group", experienceLevel: "senior", location: "Tokyo", language: "Japanese" },
	{ id: 31, name: "Emily Stewart", title: "Frontend Developer", description: "Builds responsive web apps with React and Angular.", sessionType: "one-to-one", experienceLevel: "mid-level", location: "Melbourne", language: "English" },
	{ id: 32, name: "Oliver Taylor", title: "Cloud Solutions Engineer", description: "Specializes in Google Cloud Platform.", sessionType: "group", experienceLevel: "mid-level", location: "Amsterdam", language: "Dutch" },
	{ id: 33, name: "Liam Harris", title: "Robotics Engineer", description: "Designs and builds robots for industrial automation.", sessionType: "one-to-one", experienceLevel: "senior", location: "Munich", language: "German" },
	{ id: 34, name: "Sophia Lewis", title: "Business Analyst", description: "Analyzes business processes and data to improve efficiency.", sessionType: "group", experienceLevel: "mid-level", location: "Sydney", language: "English" },
	{ id: 35, name: "Benjamin Carter", title: "Cybersecurity Analyst", description: "Protects systems and networks from cyber threats.", sessionType: "one-to-one", experienceLevel: "mid-level", location: "Hong Kong", language: "English" },
	{ id: 36, name: "Lucas Moore", title: "Game Developer", description: "Creates 3D games using Unity and Unreal Engine.", sessionType: "group", experienceLevel: "mid-level", location: "Los Angeles", language: "English" },
	{ id: 37, name: "Amelia Bell", title: "Scrum Master", description: "Leads teams using Agile Scrum methodologies.", sessionType: "one-to-one", experienceLevel: "senior", location: "London", language: "English" },
	{ id: 38, name: "David Wright", title: "Big Data Engineer", description: "Works with Hadoop, Spark, and big data technologies.", sessionType: "group", experienceLevel: "mid-level", location: "New Delhi", language: "English" },
	{ id: 39, name: "Charlotte Hughes", title: "Cloud Security Specialist", description: "Secures cloud systems and infrastructure.", sessionType: "one-to-one", experienceLevel: "senior", location: "Chicago", language: "English" },
	{ id: 40, name: "Ethan Watson", title: "IoT Developer", description: "Builds IoT systems for smart home and industrial applications.", sessionType: "group", experienceLevel: "mid-level", location: "San Francisco", language: "English" }
  ];
  

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
