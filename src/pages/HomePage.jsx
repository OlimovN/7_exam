import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import http from "../utils/axios.js";
import Loader from "../components/Loader.jsx";

const HomePage = () => {
  const [card, setCard] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(`/countries`);
        console.log(response);
        if (response && response.data && response.data.data) {
          setCard(response.data.data);
        } else {
          console.log("Javob ma'lumotlari mavjud emas");
        }
      } catch (error) {
        console.log("Xatolik:", error);
      }
    };

    fetchData();
  }, []);

  const filteredCards = useMemo(() => {
    if (!searchQuery && !region) {
      return card;
    }
    return card.filter(
      (crds) =>
        crds.name.common.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (region ? crds.region === region : true)
    );
  }, [searchQuery, region, card]);

  const handleCardClick = useCallback(
    (slug) => {
      navigate(`/card/${slug}`);
    },
    [navigate]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header setSearchQuery={setSearchQuery} setRegion={setRegion} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCards.length > 0 ? (
            filteredCards.map((crds, index) => (
              <div
                onClick={() => handleCardClick(crds.name.slug)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                key={index}
              >
                <img
                  src={crds.flags.png}
                  alt={crds.name.common}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {crds.name.common}
                  </h2>
                  <p className="text-gray-700 mb-1">
                    <strong>Population:</strong> <span>{crds.population}</span>
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Region:</strong> <span>{crds.region}</span>
                  </p>
                  <p className="text-gray-700">
                    <strong>Capital:</strong>{" "}
                    <span>{crds.capital && crds.capital[0]}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center col-span-full h-48">
            <Loader></Loader>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
