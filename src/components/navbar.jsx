import React from "react";
import gif from "../img/spotify.gif";
import icon from "../img/plas.avif";
import liked from "../img/liked.gif";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate();

  function handleHome() {
    nav("/");
  }

  function handleSongs() {
    nav("/like");
  }

  return (
    <div className="sidebar-container bg-black text-white w-[280px] h-screen p-4">
      <img
        src={gif}
        alt="Spotify Logo"
        className="sidebar-image w-[190px] mx-auto rounded-lg mb-6"
      />
      <ul className="sidebar list-none">
        <li
          className="sidebar-item cursor-pointer py-4 flex items-center text-sm font-sans transition duration-200 hover:bg-gray-700 rounded-md"
          onClick={handleHome}
        >
          <i className="fa-solid fa-house sidebar-icon text-lg pr-3"></i>
          Home
        </li>
        <li className="sidebar-item cursor-pointer py-4 flex items-center text-sm font-sans transition duration-200 hover:bg-gray-700 rounded-md">
          <i className="fa-solid fa-magnifying-glass sidebar-icon text-lg pr-3"></i>
          Search
        </li>
        <li
          className="sidebar-item cursor-pointer py-4 flex items-center text-sm font-sans transition duration-200 hover:bg-gray-700 rounded-md"
          onClick={handleSongs}
        >
          <i className="fa-solid fa-door-open sidebar-icon text-lg pr-3"></i>
          Your Library
        </li>
        <hr className="border-gray-700 my-4" />
        <li className="like-item flex items-center py-2 cursor-pointer transition duration-200 hover:bg-gray-700 rounded-md">
          <img
            className="like-image w-[35px] mr-2"
            src={icon}
            alt="Create Playlist"
          />
          <span className="font-sans">Create Playlist</span>
        </li>
        <li
          className="like-item flex items-center py-2 cursor-pointer transition duration-200 hover:bg-gray-700 rounded-md"
          onClick={handleSongs}
        >
          <img
            className="like-image w-[35px] mr-2"
            src={liked}
            alt="Liked Songs"
          />
          <span className="font-sans">Liked Songs</span>
        </li>
      </ul>
      <div className="info text-silver pl-5 mt-4">
        {[
          "Chill Mix",
          "Insta Hits",
          "Your Top Songs 2021",
          "Mellow Songs",
          "Anime Lofi & Chillhop Music",
          "BG Afro “Select” Vibes",
          "Afro “Select” Vibes",
          "Happy Hits!",
          "Deep Focus",
          "Instrumental Study",
          "OST Compilations",
          "Nostalgia for old souled mill...",
          "Mixed Feelings",
        ].map((title, index) => (
          <p
            key={index}
            className="mt-2 font-sans text-gray-400 hover:text-white transition duration-200"
          >
            {title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
