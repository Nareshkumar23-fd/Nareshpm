import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0F0F14] text-center px-4">

      {/* BIG 404 */}
      <h1 className="text-7xl font-bold text-purple-500">404</h1>

      {/* MESSAGE */}
      <h2 className="text-2xl font-semibold mt-4 text-gray-800 dark:text-white">
        Page Not Found
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition"
      >
        Go to My Website
      </button>
    </div>
  );
};

export default NotFound;