import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../utils/axios";
import { FaSun, FaMoon, FaArrowLeft } from "react-icons/fa";

const CountryDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(`countries/${slug}`);
        setProduct(response.data);

        if (response.data.borders && response.data.borders.length > 0) {
          const borderResponses = await Promise.all(
            response.data.borders.map((border) =>
              http.get(`countries/${border}`)
            )
          );
          setBorderCountries(borderResponses.map((res) => res.data));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [slug]);

  const handleBack = () => navigate("/");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`flex flex-col gap-6 p-4 ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        } shadow-md rounded-lg mb-6 transition-all duration-300`}
      >
        <div
          className={`flex flex-col md:flex-row justify-between items-center gap-4 p-4 rounded-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg transition-all duration-300`}
        >
          <h1
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Where in the world?
          </h1>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full transition-colors duration-300 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            <span
              className={`text-gray-900 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Mode
            </span>
          </div>
        </div>
        <button
          onClick={handleBack}
          className="mb-6 px-2 py-1 bg-blue-500 text-white rounded-md flex items-center gap-1 text-xs hover:bg-blue-600 transition-all duration-100"
        >
          <FaArrowLeft size={14} />
          <span className="text-sm">Back</span>
        </button>

        {product ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center items-center">
              {product.flags && product.flags.png ? (
                <img
                  src={product.flags.png}
                  alt={product.name?.common}
                  className="w-full md:w-96 h-auto object-cover rounded-lg shadow-lg"
                />
              ) : (
                <p className="text-gray-500">Image not available</p>
              )}
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-3xl font-bold mb-4">
                {product.name?.common || "Country Name"}
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p>
                    <strong>Native Name:</strong>{" "}
                    {product.name?.nativeName || "N/A"}
                  </p>
                  <p>
                    <strong>Population:</strong> {product.population || "N/A"}
                  </p>
                  <p>
                    <strong>Region:</strong> {product.region || "N/A"}
                  </p>
                  <p>
                    <strong>Sub Region:</strong> {product.subregion || "N/A"}
                  </p>
                  <p>
                    <strong>Capital:</strong> {product.capital || "N/A"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <strong>Top Level Domain:</strong>{" "}
                    {product.topLevelDomain?.[0] || "N/A"}
                  </p>
                  <p>
                    <strong>Currencies:</strong>{" "}
                    {product.currencies
                      ? Object.values(product.currencies)
                          .map((c) => c.name)
                          .join(", ")
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Languages:</strong>{" "}
                    {product.languages
                      ? Object.values(product.languages).join(", ")
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <p className="font-semibold">Border Countries:</p>
                <ul className="list-disc pl-5 mt-2">
                  {borderCountries.length > 0 ? (
                    borderCountries.map((borderCountry, index) =>
                      borderCountry && borderCountry.name?.common ? (
                        <li
                          key={index}
                          className="cursor-pointer text-blue-600 hover:underline"
                          onClick={() => setProduct(borderCountry)}
                        >
                          {borderCountry.name?.common}
                        </li>
                      ) : null
                    )
                  ) : (
                    <li>No border countries</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 border-solid rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetail;
