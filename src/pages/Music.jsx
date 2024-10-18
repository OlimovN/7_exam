import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import Heder from "../components/heder";
import Played from "../img/buttons.jfif";
import axios from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";

const Music = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const par = params.id;
  const [likes, setLikes] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRefs = useRef([]);
  const [footerTrack, setFooterTrack] = useState(null);
  const nav = useNavigate();

  const fetchDatatwo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`playlists/${par}`);
      setData(response.data);
    } catch (error) {
      setError("Xato yuz berdi, ma’lumotlarni yuklashda muammo bor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatatwo();
  }, []);

  const togglePlay = (index) => {
    if (playingIndex === index) {
      audioRefs.current[index].pause();
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null) {
        audioRefs.current[playingIndex].pause();
      }
      audioRefs.current[index].play();
      setPlayingIndex(index);
      setFooterTrack({
        name: data.tracks.items[index].track.name,
        artist: data.tracks.items[index].track.artists
          .map((artist) => artist.name)
          .join(", "),
        preview_url: data.tracks.items[index].track.preview_url,
      });
    }
  };

  const handleFooterPlayPause = (isPlaying) => {
    if (playingIndex !== null && audioRefs.current[playingIndex]) {
      if (isPlaying) {
        audioRefs.current[playingIndex].play();
      } else {
        audioRefs.current[playingIndex].pause();
      }
    }
  };

  const handleLike = (song) => {
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || [];
    const isLiked = storedLikes.some((storedSong) => storedSong.id === song.id);
    const updatedLikes = isLiked
      ? storedLikes.filter((storedSong) => storedSong.id !== song.id)
      : [...storedLikes, song];

    localStorage.setItem("likes", JSON.stringify(updatedLikes));
    setLikes(updatedLikes);
  };

  const handleImageClick = (index) => {
    setFooterTrack({
      name: data.tracks.items[index].track.name,
      artist: data.tracks.items[index].track.artists
        .map((artist) => artist.name)
        .join(", "),
      preview_url: data.tracks.items[index].track.preview_url,
    });
  };

  const handleImageClickFromGrup = () => {
    setFooterTrack({
      name: "Grup Track",
      artist: "Grup Artist",
      preview_url: "URL_TO_GRUP_AUDIO",
    });
  };

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || [];
    setLikes(storedLikes);
  }, []);

  function navhome() {
    nav("/");
  }

  return (
    <div className="flex max-w-[1800px] mx-auto">
      <Navbar />
      <div className="w-[1050px] bg-gradient-to-b from-[#1e1e1e] to-[#121212] shadow-lg rounded-lg p-5">
        <nav className="flex text-white gap-2">
          <p
            onClick={navhome}
            className="cursor-pointer w-12 h-12 rounded-full bg-[#6F7B14] flex items-center justify-center mt-5 ml-5 hover:bg-[#6F7B14]/80 transition duration-300"
          >
            <i className="fa-solid fa-arrow-left text-lg"></i>
          </p>
          <p className="cursor-pointer w-12 h-12 rounded-full bg-[#6F7B14] flex items-center justify-center mt-5 hover:bg-[#6F7B14]/80 transition duration-300">
            <i className="fa-solid fa-arrow-right text-lg"></i>
          </p>
        </nav>

        <div className="mt-5 w-full h-80 flex text-white bg-opacity-20 bg-black rounded-lg overflow-hidden">
          {loading ? (
            <span className="loader"></span>
          ) : error ? (
            <p>{error}</p>
          ) : (
            data && (
              <div className="flex">
                <img
                  src={data.images[0]?.url}
                  alt={data.name}
                  className="w-80 h-80 rounded-full p-4 border-4 border-[#6F7B14] transition-transform transform hover:scale-105"
                />
                <div className="pt-20 ml-5 font-sans">
                  <h2 className="text-lg font-medium">PUBLIC PLAYLIST</h2>
                  <h1 className="text-6xl">{data.name}</h1>
                  <p className="mt-5">
                    {data.description.split(" ").slice(0, 4).join(" ")}
                  </p>
                  <h3 className="mt-5 text-sm text-gray-400 font-normal">
                    Made by {data.owner?.display_name}
                  </h3>
                </div>
              </div>
            )
          )}
        </div>

        <div className="bg-[#121212] mt-5 rounded-lg p-5">
          <div className="flex justify-between">
            <img
              src={Played}
              alt="Grup"
              onClick={handleImageClickFromGrup}
              className="w-[290px] mt-5 cursor-pointer transition-transform transform hover:scale-105"
            />
            <select className="mt-10 mr-20 bg-transparent text-white border border-transparent h-9 rounded-md">
              <option>Custom Order</option>
            </select>
          </div>

          <div className="flex flex-col ml-5">
            <ul className="list-none flex text-[#4E4E4E] gap-52">
              <li>Title</li>
              <li>Album</li>
              <li>Date Add</li>
              <li>
                <i className="fa-regular fa-clock"></i>
              </li>
            </ul>
            <hr className="mt-2 border-[#4E4E4E]" />
          </div>

          {data?.tracks?.items?.length > 0 ? (
            data.tracks.items.map((mix, index) => (
              <div
                onClick={() => handleImageClick(index)}
                key={index}
                className="flex bg-transparent mt-8 cursor-pointer hover:bg-gray-800 transition duration-300 rounded-lg p-2"
              >
                <div className="flex">
                  <img
                    src={mix.track.album.images[0]?.url}
                    alt={mix.track.name}
                    className="w-16 h-16 ml-2"
                  />
                  <h2 className="mt-1 text-lg ml-5 text-white font-medium">
                    {mix.track.name} <br />
                    <span className="text-gray-400">
                      {mix.track.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </span>
                  </h2>
                  <p className="text-gray-400 font-semibold ml-20 mt-4">
                    {mix.track.album.name}
                  </p>
                </div>
                <div className="flex ml-auto">
                  <h3
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(mix.track);
                    }}
                    className="text-xl text-red-800 cursor-pointer mt-4 ml-auto"
                  >
                    {likes.some((like) => like.id === mix.track.id) ? (
                      <span>❤️</span>
                    ) : (
                      <span>🤍</span>
                    )}
                  </h3>
                  <h2 className="text-lg text-white font-normal mt-4 ml-5">
                    {Math.floor(mix.track.duration_ms / 60000)}:
                    {(
                      "0" + Math.floor((mix.track.duration_ms % 60000) / 1000)
                    ).slice(-2)}
                  </h2>
                  <audio ref={(ref) => (audioRefs.current[index] = ref)}>
                    <source src={mix.track.preview_url} />
                  </audio>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">Playlist bo'sh.</p>
          )}
        </div>
      </div>
      <Footer track={footerTrack} onPlayPause={handleFooterPlayPause} />
      <Heder></Heder>
    </div>
  );
};

export default Music;
