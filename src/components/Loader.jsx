import React, { useState, useEffect } from "react";

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulatsiya qilish uchun 2 soniya kutamiz
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Kontentingiz shu yerda bo'ladi */}
      <h1>Content Loaded</h1>
    </div>
  );
};

export default Loader;
