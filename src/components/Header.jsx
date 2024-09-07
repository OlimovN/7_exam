import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import ThemeToggle from "../context/ThemeToggle"; // Theme toggle component

const Header = ({ onSearch, onFilter }) => {
  const { isDarkMode } = useTheme(); // Accessing theme context

  return (
    <div
      className={`flex flex-col gap-6 p-4 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      } shadow-md rounded-lg mb-6`}
    >
      {/* Header Title and Theme Toggle */}
      <div
        className={`flex flex-col md:flex-row justify-between items-center gap-4 p-4 rounded-md ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Where in the world?
        </h1>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <ThemeToggle />
          <span
            className={`text-gray-900 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Mode
          </span>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div
        className={`flex flex-col md:flex-row gap-4 items-center w-full p-4 rounded-md ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Search Section - Left */}
        <input
          type="text"
          placeholder="Search for a country..."
          onChange={(e) => onSearch(e.target.value)}
          className={`flex-1 p-3 rounded-lg outline-none ${
            isDarkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          } border focus:border-blue-500 transition-all duration-300`}
        />
        {/* Filter Section - Right */}
        <select
          onChange={(e) => onFilter(e.target.value)}
          className={`flex-1 p-3 rounded-lg outline-none ${
            isDarkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          } border focus:border-blue-500 transition-all duration-300`}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
