import React from "react";

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    <p className="mt-4 text-gray-500">Loading...</p>
  </div>
);

export default Loader;
