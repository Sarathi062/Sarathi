import { Link } from "react-router-dom";
import ai from "../assets/ai.jpeg";
import wellness from "../assets/wellness.jpeg";
import gaming from "../assets/gaming.jpeg";

const Home = (props) => {
	return (
		<div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white ">
			<div className="flex flex-col-reverse md:flex-row justify-between items-center p-6 md:px-16 lg:px-32 py-12">
				<div className="w-full md:w-1/2 text-center md:text-left">
					<h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
						Empower Growth with AI-Driven Mentorship
					</h1>
					<p className=" mt-6 text-lg md:text-xl lg:text-2xl max-w-lg mx-auto md:mx-0">
						Discover personalized guidance with Sarathi, powered by AI and
						designed to bridge mentorship gaps globally.
					</p>
					<div className="mt-8 flex flex-col md:flex-row justify-center md:justify-start gap-4">
						<Link to="/mentors">
							<button className="bg-white text-purple-600 py-3 px-6 rounded-lg hover:bg-gray-200 transition w-full md:w-auto shadow-lg">
								Find Mentor
							</button>
						</Link>
						{!props.mentorLogin && !props.menteeLogin && !props.IsLoggedIn && (
							<Link to="/become-mentor">
								<button className="bg-white text-purple-600 py-3 px-6 rounded-lg hover:bg-gray-200 transition w-full md:w-auto shadow-lg">
									Be a Mentor
								</button>
							</Link>
						)}
						<Link to="/ai-mentor">
							<button className="bg-white text-purple-600 py-3 px-6 rounded-lg hover:bg-gray-200 transition w-full md:w-auto shadow-lg">
								AI Mentor Match
							</button>
						</Link>
					</div>
				</div>
			</div>
			{/* Key Features Section */}
			<div className="bg-white py-16">
				<div className="container mx-auto px-6 md:px-16 lg:px-32">
					<h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
						Why Choose SARATHI?
					</h2>
					<div className="flex flex-col sm:flex-row justify-between gap-6">
						<div className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform duration-300 hover:-translate-y-2">
							<img src={ai} alt="AI icon" className="w-16 h-16 mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-gray-800">
								AI-Powered Mentorship
							</h3>
							<p className="text-gray-600 mt-2">
								Leveraging AI to provide personalized mentor-mentee matching
								based on skills, interests, and goals.
							</p>
						</div>

						<div className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform duration-300 hover:-translate-y-2">
							<img
								src={gaming}
								alt="Gamification icon"
								className="w-16 h-16 mx-auto mb-4"
							/>
							<h3 className="text-xl font-semibold text-gray-800">
								Gamification & Rewards
							</h3>
							<p className="text-gray-600 mt-2">
								Stay motivated with rewards, leaderboards, and badges that track
								your progress and achievements.
							</p>
						</div>

						<div className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform duration-300 hover:-translate-y-2">
							<img
								src={wellness}
								alt="Wellness icon"
								className="w-16 h-16 mx-auto mb-4"
							/>
							<h3 className="text-xl font-semibold text-gray-800">
								Mental Wellness Support
							</h3>
							<p className="text-gray-600 mt-2">
								Access mental health support and manage screen time for a
								balanced mentorship experience.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
