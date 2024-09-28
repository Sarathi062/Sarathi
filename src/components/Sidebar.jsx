// import React from "react";
import { FaUser, FaChalkboardTeacher, FaBell, FaCog } from "react-icons/fa";
import useSidebarStore from "../utils/useSideBarStore";

const Sidebar = () => {
	const toggleState = useSidebarStore((state) => state.sidebarOpen);

	return (
		<div className="flex">
			<aside
				className={`${
					toggleState ? "w-64" : "w-0"
				} bg-gray-800 text-white h-full transition-all duration-300 overflow-hidden`}
			>
				<div className="p-4">
					<h2 className="text-xl font-bold mb-8">Menter Connect</h2>

					{/* Profile Section */}
					<div className="flex items-center mb-6">
						<FaUser className="text-3xl mr-3" />
						<div>
							<p className="font-bold">Student Name</p>
							<p className="text-sm text-gray-300">student.email@example.com</p>
						</div>
					</div>

					{/* Navigation Links */}
					<nav>
						<ul>
							<li className="mb-4">
								<a
									href="#"
									className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition-colors"
								>
									<FaChalkboardTeacher className="mr-3" />
									<span>Mentorships</span>
								</a>
							</li>
							<li className="mb-4">
								<a
									href="#"
									className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition-colors"
								>
									<FaBell className="mr-3" />
									<span>Notifications</span>
								</a>
							</li>
							<li className="mb-4">
								<a
									href="#"
									className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition-colors"
								>
									<FaCog className="mr-3" />
									<span>Settings</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</aside>
		</div>
	);
};

export default Sidebar;
