import React from "react";
import contact from "../img/contact.png";

const Rightmenu = () => {
  return (
    <div>
      <div className="menu bg-black text-white w-[280px] h-full">
        <h1 className="text-[20px] pl-4 pt-5 font-sans">
          Friend Activity <span className="ml-20 font-thin text-[30px]">x</span>
        </h1>
        <br />
        <p className="text mt-5 text-sm pl-5 font-sans w-[270px]">
          Let friends and followers on Spotify see what you’re listening to.
        </p>
        <br /> <br />
        <img src={contact} alt="" className="pl-5 w-[180px]" />
        <br /> <br />
        <img src={contact} alt="" className="pl-5 w-[180px]" />
        <br /> <br />
        <img src={contact} alt="" className="pl-5 w-[180px]" />
        <br />
        <p className="text text-sm pl-5 font-sans w-[270px] mt-5">
          Go to Settings Social and enable “Share my listening activity on
          Spotify.” You can turn this off at any time.
        </p>
        <button className="bg-white text-black w-[180px] h-[45px] rounded-lg border-transparent font-sans text-[15px] font-semibold mx-auto flex items-center justify-center mt-4">
          SETTINGS
        </button>
      </div>
    </div>
  );
};

export default Rightmenu;
