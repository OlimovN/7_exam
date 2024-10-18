import React, { useState, useEffect, useRef } from "react";

const Footer = ({ track, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [track]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progressPercentage =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressPercentage);
    }
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    if (audioRef.current) {
      const newTime = (newProgress / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(newProgress);
    }
  };

  return (
    <footer className="w-[1050px] fixed bottom-0 bg-black text-white border-t border-gray-800 p-4 flex items-center justify-between h-20">
      <div className="w-[150px]">
        <p className="text-sm font-sans">
          {track ? `${track.name} - ${track.artist}` : "No song playing"}
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center space-x-4">
          <i className="fas fa-step-backward cursor-pointer text-white text-lg"></i>
          <button
            onClick={togglePlayPause}
            className="bg-none border-none text-white cursor-pointer"
          >
            {isPlaying ? (
              <i className="fas fa-pause text-xl"></i>
            ) : (
              <i className="fas fa-play text-xl"></i>
            )}
          </button>
          <i className="fas fa-step-forward cursor-pointer text-white text-lg"></i>
        </div>

        <div className="flex items-center w-[290px] mt-2">
          <span className="text-sm">0:00</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="mx-2 w-full"
          />
          <span className="text-sm">3:45</span>
        </div>
      </div>

      <div className="mr-5">
        <i className="fas fa-volume-up text-white text-lg cursor-pointer"></i>
      </div>

      {track && (
        <audio
          ref={audioRef}
          src={track.preview_url}
          onTimeUpdate={handleTimeUpdate}
        ></audio>
      )}
    </footer>
  );
};

export default Footer;
