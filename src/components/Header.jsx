import React from "react";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "./Loader";

const Header = ({ setSearchQuery, setRegion }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCountries = async (searchTerm) => {
    if (searchTerm.trim() === "") {
      setResults([]);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://frontend-mentor-apis-6efy.onrender.com/countries?search=${searchTerm}`
      );
      setResults(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch countries.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      searchCountries(query);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div
      className={`flex flex-col gap-6 p-4 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      } shadow-md rounded-lg mb-6 transition-all duration-300`}
    >
      <div
        className={`flex flex-col md:flex-row justify-between items-center gap-4 p-4 rounded-md ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg transition-all duration-300`}
      >
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Where in the world?
        </h1>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-300 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <span
            className={`text-gray-900 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Mode
          </span>
        </div>
      </div>

      <div
        className={`flex flex-col md:flex-row gap-4 items-center w-full p-4 rounded-md ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <input
          type="text"
          placeholder="Search for a country..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchQuery(e.target.value);
          }}
          className={`flex-1 p-3 rounded-lg outline-none ${
            isDarkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          } border focus:border-blue-500 transition-all duration-300`}
        />
        <select
          onChange={(e) => {
            setRegion(e.target.value);
          }}
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

      {results.length > 0 && (
        <ul
          className={`mt-2 rounded-md shadow-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {results.map((country) => (
            <li
              key={country.name}
              className="flex items-center gap-2 p-2 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <img
                src={country.flags?.svg}
                alt={`${country.name} flag`}
                width={50}
                className="w-12 h-8"
              />
              <span>{country.name}</span>
            </li>
          ))}
        </ul>
      )}
<Loader></Loader>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default Header;
