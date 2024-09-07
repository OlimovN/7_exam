import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import CountryDetail from "./pages/CountryDetail.jsx";
import "./App.css";

const App = () => (
  <ThemeProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route  path='/card/:slug' element={<CountryDetail />} />
    </Routes>
  </ThemeProvider>
);

export default App;
