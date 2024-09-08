import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginAuth = ({ isMobile, onCloseMenu }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className="relative">
			{isAuthenticated ? (
				<>
					{isMobile ? (
						<div>
							<p className="text-3xl mb-4">
								Welcome, <span className="font-semibold">{user.name}</span>
							</p>
							<button
								onClick={() => {
									logout({
										logoutParams: { returnTo: window.location.origin },
									});
									onCloseMenu();
								}}
								className="block w-full text-left px-4 py-2 text-xl hover:bg-gray-200 transition-all duration-150"
							>
								Log Out
							</button>
						</div>
					) : (
						<>
							<img
								src={user.picture}
								alt={user.name}
								className="h-10 w-10 rounded-full cursor-pointer"
								onClick={toggleDropdown}
							/>
							{/* Dropdown for desktop */}
							{isDropdownOpen && (
								<div
									className="absolute right-0 mt-2 py-3 w-56 bg-white rounded-lg shadow-lg text-black
									transition-all duration-200 ease-in-out transform scale-100 origin-top-right z-10"
									style={{
										animation: isDropdownOpen
											? "fadeIn 0.3s ease-out forwards"
											: "fadeOut 0.3s ease-out forwards",
									}}
								>
									<div className="px-4 py-2">
										<p className="text-sm font-semibold text-gray-800">
											{user.name}
										</p>
										<p className="text-sm text-gray-500">{user.email}</p>
									</div>
									<hr className="my-2 border-gray-300" />
									<button
										onClick={() => {
											logout({
												logoutParams: { returnTo: window.location.origin },
											});
											toggleDropdown();
										}}
										className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 transition-all duration-150"
									>
										Log Out
									</button>
								</div>
							)}
						</>
					)}
				</>
			) : (
				<button
					onClick={() => {
						loginWithRedirect();
						if (isMobile) onCloseMenu();
					}}
					className={`${
						isMobile ? "text-3xl" : "text-white"
					} hover:text-gray-300 transition-colors duration-150`}
				>
					Log In / Sign up
				</button>
			)}
		</div>
	);
};

export default LoginAuth;
