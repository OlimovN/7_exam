import React, { useState, useEffect } from "react";
import axios from "axios";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const CountrySearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounced function to search countries
  const searchCountries = debounce(async (searchTerm) => {
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
  }, 300); // Debounce delay in millisecondsa

  useEffect(() => {
    if (query.length > 0) {
      searchCountries(query);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search for a country..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded w-full"
      />
      {loading && <p className="mt-2 text-gray-500">Loading...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {results.length > 0 && (
        <ul className="mt-2">
          {results.map((country) => (
            <li
              key={country.name}
              className="flex items-center gap-2 p-2 border-b"
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
    </div>
  );
};

export default CountrySearch;
