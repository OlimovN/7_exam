import React, { useEffect, useState } from "react";
import Heder from "../components/heder";
import Toplam from "../img/buttons.jfif";
import Footermusic from "../components/Footer";

const Like = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [footerTrack, setFooterTrack] = useState(null);

  const handleLike = (song) => {
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || [];
    const isLiked = storedLikes.some((storedSong) => storedSong.id === song.id);
    const updatedLikes = isLiked
      ? storedLikes.filter((storedSong) => storedSong.id !== song.id)
      : [...storedLikes, song];

    localStorage.setItem("likes", JSON.stringify(updatedLikes));
    setLikedSongs(updatedLikes);
  };

  const handleImageClick = (song) => {
    setFooterTrack({
      name: song.name,
      artist: song.artist,
      preview_url: song.preview_url,
    });
  };

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || [];
    setLikedSongs(storedLikes);
  }, []);

  return (
    <div className="flex max-w-[1800px] mx-auto">
      <Heder />
      <div className="w-full p-6">
        <nav className="flex text-white space-x-4 mb-4">
          <p className="bg-[#302761] rounded-full p-3 hover:bg-[#3b366e] transition">
            <i className="fa-solid fa-arrow-left text-lg"></i>
          </p>
          <p className="bg-[#302761] rounded-full p-3 hover:bg-[#3b366e] transition">
            <i className="fa-solid fa-arrow-right text-lg"></i>
          </p>
        </nav>

        <div className="mt-6 flex flex-col text-white">
          <h2 className="text-2xl font-medium">PUBLIC PLAYLIST</h2>
          <h1 className="text-6xl">Liked Songs</h1>
          <p className="mt-4">{likedSongs.length} songs</p>
        </div>

        <div className="mt-4 bg-gray-900 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <img
              src={Toplam}
              alt="Toplam"
              className="w-40 rounded-lg shadow-md"
            />
            <select className="bg-transparent border border-gray-600 text-white p-2 rounded transition hover:border-gray-300">
              <option>Custom Order</option>
            </select>
          </div>

          <div className="mt-4">
            <ul className="flex space-x-12 text-gray-400">
              <li>Title</li>
              <li>Album</li>
              <li>Date Added</li>
              <li>
                <i className="fa-regular fa-clock"></i>
              </li>
            </ul>
            <hr className="border-gray-400 mt-2" />
          </div>

          <div className="mt-4">
            {likedSongs.length > 0 ? (
              likedSongs.map((song, index) => {
                const isLiked = likedSongs.some(
                  (storedSong) => storedSong.id === song.id
                );

                return (
                  <div
                    key={song.id}
                    className="flex justify-between items-center bg-gray-800 p-4 rounded-lg mt-2 cursor-pointer hover:bg-gray-700 transition"
                    onClick={() => handleImageClick(song)}
                  >
                    <div className="flex items-center">
                      <span className="text-xl text-gray-400 mr-4">
                        {index + 1}
                      </span>
                      <img
                        src={
                          song.album.images[0]?.url ||
                          "/path/to/placeholder.jpg"
                        }
                        alt={song.name}
                        className="w-16 h-16 rounded-lg shadow-sm"
                      />
                      <div className="ml-4">
                        <h2 className="text-xl font-semibold text-white">
                          {song.name}
                        </h2>
                        <p className="text-gray-400">{song.album.name}</p>
                      </div>
                    </div>
                    <h3
                      className="text-lg cursor-pointer transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(song);
                      }}
                    >
                      {isLiked ? (
                        <span className="text-green-400">❤️</span>
                      ) : (
                        <span>🤍</span>
                      )}
                    </h3>
                    <h2 className="text-lg text-white">
                      {Math.floor(song.duration_ms / 60000)}:
                      {(
                        "0" + Math.floor((song.duration_ms % 60000) / 1000)
                      ).slice(-2)}
                    </h2>
                  </div>
                );
              })
            ) : (
              <p className="text-white text-2xl text-center">No liked songs</p>
            )}
          </div>
        </div>
        <Footermusic track={footerTrack} />
      </div>
    </div>
  );
};

export default Like;
