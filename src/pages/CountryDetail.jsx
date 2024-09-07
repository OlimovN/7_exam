import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios.js";
import Loader from "../components/Loader.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import ThemeToggle from "../context/ThemeToggle.jsx";

const CountryDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [selectedBorder, setSelectedBorder] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`/alpha/${code}`);
        if (response.status === 200 && response.data) {
          setCountry(response.data);

          if (response.data.borders && response.data.borders.length > 0) {
            fetchBorders(response.data.borders);
          }
        } else {
          setError("No country data found");
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
        setError("Failed to fetch country details. Please try again later.");
      }
    };

    const fetchBorders = async (borderCodes) => {
      try {
        const borderData = await Promise.all(
          borderCodes.map((code) => axios.get(`/alpha/${code}`))
        );
        setBorderCountries(borderData.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching border countries:", error);
        setError("Failed to fetch border countries. Please try again later.");
      }
    };

    fetchCountry();
  }, [code]);

  const handleBorderClick = (borderCountry) => {
    setSelectedBorder(borderCountry);
  };

  const filteredBorders = borderCountries.filter((border) =>
    border.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div
        className={`p-6 max-w-4xl mx-auto mt-8 rounded-lg shadow-md ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!country) return <Loader />;

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Responsive Header */}
      <header
        className={`flex flex-col md:flex-row justify-between items-center gap-4 p-4 rounded-md ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Where in the world?
        </h1>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <ThemeToggle />
          <span className={`${isDarkMode ? "text-white" : "text-black"}`}>
            Mode
          </span>
        </div>
      </header>

      <div
        className={`p-6 max-w-4xl mx-auto mt-8 rounded-lg shadow-md ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <img
              src={country.flags?.svg || "default-flag.png"}
              alt={country.name?.common || "Country Flag"}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">
              {country.name?.common || "Country Name"}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <strong>Region:</strong> {country.region || "N/A"}
              </p>
              <p>
                <strong>Subregion:</strong> {country.subregion || "N/A"}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {country.population?.toLocaleString() || "N/A"}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital?.join(", ") || "N/A"}
              </p>
              <p>
                <strong>Languages:</strong>{" "}
                {Object.values(country.languages || {}).join(", ") || "N/A"}
              </p>
              <p>
                <strong>Currencies:</strong>{" "}
                {Object.values(country.currencies || {})
                  .map((c) => c.name)
                  .join(", ") || "N/A"}
              </p>
              <p>
                <strong>Timezones:</strong>{" "}
                {country.timezones?.join(", ") || "N/A"}
              </p>
              <p>
                <strong>Area:</strong> {country.area?.toLocaleString() || "N/A"}{" "}
                km²
              </p>
              <div className="mb-4">
                <strong>Borders:</strong>{" "}
                <input
                  type="text"
                  placeholder="Search borders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ul className="mt-2">
                  {filteredBorders.length ? (
                    filteredBorders.map((border) => (
                      <li
                        key={border.cca3}
                        className="cursor-pointer hover:underline"
                        onClick={() => handleBorderClick(border)}
                      >
                        {border.name.common}
                      </li>
                    ))
                  ) : (
                    <li>No borders found</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {selectedBorder && (
          <div className="mt-6 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">
              {selectedBorder.name.common}
            </h2>
            <img
              src={selectedBorder.flags.svg}
              alt={selectedBorder.name.common}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <p>
              <strong>Region:</strong> {selectedBorder.region}
            </p>
            <p>
              <strong>Capital:</strong>{" "}
              {selectedBorder.capital?.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Population:</strong>{" "}
              {selectedBorder.population.toLocaleString()}
            </p>
            <p>
              <strong>Languages:</strong>{" "}
              {Object.values(selectedBorder.languages).join(", ")}
            </p>
          </div>
        )}

        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
