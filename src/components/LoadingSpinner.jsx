import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
      
      {/* Message */}
      <h1 className="text-xl font-semibold text-gray-600 mt-4">
        This may take time; it's not our private server.
      </h1>
    </div>
  );
};

export default LoadingSpinner;
