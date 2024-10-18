import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Like from "./pages/Like";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/music/:id" element={<Music></Music>}></Route>
        <Route path="/like" element={<Like></Like>}></Route>
      </Routes>
    </div>
  );
};

export default App;
