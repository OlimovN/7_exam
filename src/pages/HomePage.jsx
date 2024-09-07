import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useCountries from "../hooks/userCountries.js";
import { useTheme } from "../context/ThemeContext.jsx";
import Header from "../components/Header.jsx";
import Loader from "../components/Loader.jsx";

const HomePage = () => {
  const { countries, loading } = useCountries();
  const { isDarkMode } = useTheme();
  const [region, setRegion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      return (
        (region ? country.region === region : true) &&
        (searchTerm
          ? country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          : true)
      );
    });
  }, [countries, region, searchTerm]);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } transition-colors duration-300`}
    >
      <Header onSearch={setSearchTerm} onFilter={setRegion} />

      <main className="flex-1 p-4 sm:p-6">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {filteredCountries.length ? (
              filteredCountries.map((country) => (
                <Link key={country.cca3} to={`/country/${country.cca3}`}>
                  <div
                    className={`rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    } overflow-hidden`}
                  >
                    <img
                      src={country.flags.svg}
                      alt={country.name.common}
                      className="w-full h-40 object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
                    />
                    <div className="p-4">
                      <h3
                        className={`text-lg font-bold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {country.name.common}
                      </h3>
                      <p
                        className={`text-gray-700 ${
                          isDarkMode ? "text-white" : "text-gray-600"
                        }`}
                      >
                        <strong>Population:</strong>{" "}
                        {country.population.toLocaleString()}
                      </p>
                      <p
                        className={`text-gray-700 ${
                          isDarkMode ? "text-white" : "text-gray-600"
                        }`}
                      >
                        <strong>Region:</strong> {country.region}
                      </p>
                      <p
                        className={`text-gray-700 ${
                          isDarkMode ? "text-white" : "text-gray-600"
                        }`}
                      >
                        <strong>Capital:</strong> {country.capital?.join(", ")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No countries found</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
