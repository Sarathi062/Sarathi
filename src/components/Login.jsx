import React from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const Login = () => {
	return (
		<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600  sm:px-0">
			<div className="bg-white shadow-lg md:rounded-3xl p-6 sm:p-10 lg:p-16 max-w-sm sm:max-w-md lg:max-w-lg w-full">
				{/* Title */}
				<h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
					Welcome Back!
				</h2>

				{/* Social Media Login */}
				<div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
					<button
						type="button"
						className="flex items-center justify-center w-full sm:w-1/2 py-3 px-5 bg-red-500 hover:bg-red-600 text-white rounded-full transition duration-200"
					>
						<FaGoogle className="mr-2 text-lg" />
						Google
					</button>
					<button
						type="button"
						className="flex items-center justify-center w-full sm:w-1/2 py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-200"
					>
						<FaFacebookF className="mr-2 text-lg" />
						Facebook
					</button>
				</div>

				{/* Divider */}
				<div className="relative mb-6 sm:mb-8">
					<hr className="border-gray-300" />
					<span className="absolute top-[-14px] left-1/2 transform -translate-x-1/2 bg-white px-4 text-gray-600">
						or
					</span>
				</div>

				{/* Login Form */}
				<form>
					<div className="mb-4 sm:mb-6">
						<label
							className="block text-gray-700 text-sm font-semibold mb-2"
							htmlFor="username"
						>
							Username
						</label>
						<input
							className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:border-indigo-500 transition duration-200"
							id="username"
							type="text"
							placeholder="Enter your username"
							required
						/>
					</div>

					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-semibold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:border-indigo-500 transition duration-200"
							id="password"
							type="password"
							placeholder="Enter your password"
							required
						/>
					</div>

					{/* Login Button */}
					<button
						className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full transition duration-200"
						type="submit"
					>
						Sign In
					</button>

					{/* Forgot Password */}
					<div className="text-center mt-4">
						<a
							className="inline-block align-baseline font-semibold text-sm text-indigo-500 hover:text-indigo-700 transition duration-200"
							href="#"
						>
							Forgot Password?
						</a>
					</div>

					{/* Create Account */}
					<div className="text-center mt-6">
						<span className="text-gray-600">
							Don't have an account?{" "}
						</span>
						<a
							className="font-semibold text-indigo-500 hover:text-indigo-700 transition duration-200"
							href="#"
						>
							Create one
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
