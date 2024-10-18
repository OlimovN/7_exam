import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "../pages/home.css";
import Heder from "../components/heder";
import Footer from "../components/Footer";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState("");
  const [twodata, settwodata] = useState("");
  const [threedata, setthreedata] = useState("");
  const [fordata, setfordata] = useState("");
  const [fifedata, setfifedata] = useState("");
  const [top, settop] = useState("");
  const [onelimit, setonelimit] = useState(4);
  const [twolimit, settwolimit] = useState(4);
  const [threelimit, setthreelimit] = useState(4);
  const [forlimit, setforlimit] = useState(4);
  const [fifelimit, setfifelimit] = useState(4);
  const nav = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "/browse/categories/toplists/playlists",
        {
          params: {
            limit: onelimit,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.log("Xato yuz berdi:", error);
    }
  };

  function handleonetop() {
    setonelimit(20);
  }

  useEffect(() => {
    fetchData();
  }, [onelimit]);

  const fetchDatatwo = async () => {
    try {
      const response = await axios.get(
        "/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists",
        {
          params: {
            limit: twolimit,
          },
        }
      );
      settwodata(response.data);
    } catch (error) {
      console.log("Xato yuz berdi:", error);
    }
  };
  function handletwotop() {
    settwolimit(40);
  }

  useEffect(() => {
    fetchDatatwo();
  }, [twolimit]);

  const fetchDatathree = async () => {
    try {
      const response = await axios.get(
        "/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists",
        {
          params: {
            limit: threelimit,
          },
        }
      );
      setthreedata(response.data);
    } catch (error) {
      console.log("Xato yuz berdi:", error);
    }
  };
  function handlethreetop() {
    setthreelimit(40);
  }

  useEffect(() => {
    fetchDatathree();
  }, [threelimit]);

  const fetchDatafor = async () => {
    try {
      const response = await axios.get(
        "/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists",
        {
          params: {
            limit: forlimit,
          },
        }
      );
      setfordata(response.data);
    } catch (error) {
      console.log("Xato yuz berdi:", error);
    }
  };
  function handlefortop() {
    setforlimit(40);
  }

  useEffect(() => {
    fetchDatafor();
  }, [forlimit]);

  const fetchDatafife = async () => {
    try {
      const response = await axios.get(
        "/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists",
        {
          params: {
            limit: fifelimit,
          },
        }
      );
      setfifedata(response.data);
    } catch (error) {
      console.log("Xato yuz berdi:", error);
    }
  };
  function handlefifetop() {
    setfifelimit(40);
  }

  useEffect(() => {
    fetchDatafife();
  }, [fifelimit]);

  const fetchDatatop = async () => {
    try {
      const response = await axios.get(
        "/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists",
        {
          params: {
            limit: 6,
          },
        }
      );
      settop(response.data);
    } catch (error) {
      console.log("Xato yuz berdi:", error);
    }
  };

  useEffect(() => {
    fetchDatatop();
  }, []);

  function ozpage(id) {
    nav(`/music/${id}`);
  }
  return (
    <div className="crm">
      <div className="conta">
        <div className="homethreedf">
          <Navbar></Navbar>
          <div className="mainwidth contai">
            <nav>
              <p>
                <i class="fa-solid fa-arrow-left"></i>
              </p>
              <p>
                <i class="fa-solid fa-arrow-right"></i>
              </p>
            </nav>
            <div className="navtwo">
              <h1>Good afternoon</h1>
            </div>

            <div className="onemenu">
              {top?.playlists?.items?.length > 0 &&
                top.playlists.items.map((mix, index) => (
                  <div
                    onClick={() => ozpage(mix.id)}
                    key={index}
                    className="carding"
                  >
                    <img src={mix.images[0]?.url} alt="" />
                    <p>{mix.name}</p>
                  </div>
                ))}
            </div>

            <div className="topmixes">
              <div className="topm-p">
                <h1>Your top mixes</h1>
                <p onClick={handleonetop}>SEE ALL</p>
              </div>
              <div className="topmcarddf">
                {data?.playlists?.items?.length > 0 ? (
                  data.playlists.items.map((mix, index) => (
                    <div
                      onClick={() => ozpage(mix.id)}
                      key={index}
                      className="topmixcard"
                    >
                      <img src={mix.images[0]?.url} alt={mix.name} />
                      <p>{mix.name.split(" ").slice(0, 2).join(" ")}...</p>
                      <p>
                        {mix.description.split(" ").slice(0, 5).join(" ")}...
                      </p>
                    </div>
                  ))
                ) : (
                  <span className="loader"></span>
                )}
              </div>
            </div>

            <div className="topmixes">
              <div className="topm-p">
                <h1>Made for you</h1>
                <p onClick={handletwotop}>SEE ALL</p>
              </div>
              <div className="topmcarddf">
                {twodata?.playlists?.items?.length > 0 &&
                  twodata.playlists.items.map((mix, index) => (
                    <div
                      onClick={() => ozpage(mix.id)}
                      key={index}
                      className="topmixcard"
                    >
                      {" "}
                      <img src={mix.images[0]?.url} alt={mix.name} />
                      <p>{mix.name.split(" ").slice(0, 2).join(" ")}...</p>
                      <p>
                        {mix.description.split(" ").slice(0, 1).join(" ")}...
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="topmixes">
              <div className="topm-p">
                <h1>Recently played</h1>
                <p onClick={handlethreetop}>SEE ALL</p>
              </div>
              <div className="topmcarddf">
                {threedata?.playlists?.items?.length > 0 &&
                  threedata.playlists.items.map((mix, index) => (
                    <div
                      onClick={() => ozpage(mix.id)}
                      key={index}
                      className="topmixcard"
                    >
                      <img src={mix.images[0]?.url} alt={mix.name} />
                      <p> {mix.name.split(" ").slice(0, 2).join(" ")}... </p>
                      <p>
                        {mix.description.split(" ").slice(0, 5).join(" ")}...
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="topmixes">
              <div className="topm-p">
                <h1>Jump back in</h1>
                <p onClick={handlefortop}>SEE ALL</p>
              </div>
              <div className="topmcarddf">
                {fordata?.playlists?.items?.length > 0 &&
                  fordata.playlists.items.map((mix, index) => (
                    <div
                      onClick={() => ozpage(mix.id)}
                      key={index}
                      className="topmixcard"
                    >
                      <img src={mix.images[0]?.url} alt={mix.name} />
                      <p> {mix.name.split(" ").slice(0, 2).join(" ")}... </p>
                      <p>
                        {mix.description.split(" ").slice(0, 1).join(" ")}...
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="topmixes">
              <div className="topm-p">
                <h1>Uniquely yours</h1>
                <p onClick={handlefifetop}>SEE ALL</p>
              </div>
              <div className="topmcarddf">
                {fifedata?.playlists?.items?.length > 0 &&
                  fifedata.playlists.items.map((mix, index) => (
                    <div
                      onClick={() => ozpage(mix.id)}
                      key={index}
                      className="topmixcard"
                    >
                      <img src={mix.images[0]?.url} alt={mix.name} />
                      <p> {mix.name.split(" ").slice(0, 2).join(" ")}... </p>
                      <p>
                        {mix.description.split(" ").slice(0, 2).join(" ")}...
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <Footer></Footer>
          </div>
          <Heder></Heder>
        </div>
      </div>
    </div>
  );
};

export default Home;
