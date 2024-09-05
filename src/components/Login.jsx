import React from "react";
import { FaGoogle } from "react-icons/fa"; // Import Google icon from react-icons

const Login = () => {
	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-lg px-12 pt-8 pb-10">
				{/* Title */}
				<h2 className="text-3xl font-semibold text-center mb-6 text-blue-900">
					Sign In to Your Account
				</h2>

				{/* Google Login */}
				<div className="flex justify-center mb-6">
					<button
						type="button"
						className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
					>
						<FaGoogle className="mr-2 text-lg" />
						Sign in with Google
					</button>
				</div>

				{/* Divider */}
				<div className="relative mb-6">
					<hr className="border-gray-300" />
					<span className="absolute top-[-14px] left-1/2 transform -translate-x-1/2 bg-white px-4 text-gray-600">
						or
					</span>
				</div>

				{/* Login Form */}
				<form>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Username
						</label>
						<input
							className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							type="text"
							placeholder="Enter your username"
						/>
					</div>

					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="Enter your password"
						/>
					</div>

					{/* Login Button */}
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
							type="button"
						>
							Sign In
						</button>
					</div>

					{/* Forgot Password */}
					<div className="text-center mt-4">
						<a
							className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
							href="#"
						>
							Forgot Password?
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
