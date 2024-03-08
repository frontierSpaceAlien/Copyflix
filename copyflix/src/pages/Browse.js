import React, { useState, useEffect } from "react";
import Sliders from "../components/slider/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  getGenres,
  getBrowseData,
  getBillboardMovie,
  getTrailers,
} from "../data/data";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Rating from "react-rating";
import Modal from "../components/modal/modalMenu";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Skeleton } from "@mui/material";
import { FaPlay } from "react-icons/fa";

export default function Browse() {
  const [genre, setGenre] = useState([]);
  const [diffData, setDiffData] = useState([]);
  const [billboardMovie, setBillboardMovie] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = useState("");
  const [video, setVideo] = useState([]);

  let rand = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  function shuffle(o) {
    for (
      var j, x, i = o.length;
      i;
      j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  }
  var random = shuffle(rand);

  useEffect(() => {
    const getData = async (e) => {
      try {
        const settings = {
          infinite: false,
          draggable: false,
          speed: 500,
          slidesToShow: 6,
          slidesToScroll: 6,
          arrows: false,
          responsive: [
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
              },
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
          ],
        };
        const genreGet = await getGenres();
        var billboardMovieGet = await getBillboardMovie(genreGet);
        var browse = [];

        for (let i = 0; i < 19; i++) {
          browse.push(genreGet.genres[random[i]]);
        }
        const genreMovies = await getBrowseData(browse);

        for (let i = 0; i < genreMovies.length; i++) {
          genreMovies[i].push(settings);
        }

        setBillboardMovie(billboardMovieGet);
        setGenre(browse);
        setDiffData(genreMovies);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  function updateData(newData) {
    setDiffData(newData);
  }

  function loadedDiv() {
    setLoaded(true);
  }

  const getVideo = async (e) => {
    try {
      const video = await getTrailers(e);

      setVideo(video);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpen = (data) => {
    setOpen(true);
    setModalData(data);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Grid container wrap="nowrap">
        {!loaded &&
          Array.from(new Array(6)).map((item, index) => (
            <Box key={index} sx={{ width: "100%", my: 0, padding: "1%" }}>
              <Skeleton
                sx={{
                  bgcolor: "grey.900",
                  paddingBottom: "90%",
                  paddingTop: "50%",
                }}
                width={"100%"}
                variant="rectangular"
              />
            </Box>
          ))}
      </Grid>
      <div style={loaded ? {} : { display: "none" }}>
        <div className="browseContainer">
          <div className="infoContainer">
            <p className="infoTitle">{billboardMovie.title}</p>
            <Rating
              className="ratingStar"
              readonly={true}
              initialRating={
                Math.round((billboardMovie.vote_average / 2) * 10) / 10
              }
              emptySymbol={<FaRegStar size={"1.3vw"} />}
              fullSymbol={<FaStar size={"1.3vw"} />}
            />
            <p className="infoDesc">{billboardMovie.overview}</p>
            <div className="billboardButtons">
              <div className="billboardPlay">
                <FaPlay
                  style={{ marginRight: "6%", marginLeft: "20%" }}
                  size={"1.3vw"}
                />
                <p>Play</p>
              </div>
              <div
                className="billboardMoreInfo"
                onClick={() => {
                  handleOpen(billboardMovie);
                  getVideo(billboardMovie.id);
                }}
              >
                <AiOutlineInfoCircle
                  style={{
                    color: "white",
                    marginRight: "4%",
                    marginLeft: "10%",
                  }}
                  size={"1.7vw"}
                />
                <p>More Info</p>
              </div>
            </div>
          </div>
          <img
            className="billboard"
            src={`https://image.tmdb.org/t/p/w1280${billboardMovie.backdrop_path}`}
            alt="billboard"
          />
        </div>
        <div className="mainContainer">
          <div className="slider">
            {diffData.map((movie, i = 0) => {
              return [
                <div>
                  <div className="gap" />
                  <h2 className="sliderText">{genre[i].name} Movies</h2>
                  <Sliders
                    data={movie}
                    index={i}
                    diffData={diffData}
                    updateData={(newData) => updateData(newData)}
                    checkLoad={loadedDiv}
                    genre={genre}
                  />
                </div>,
              ];
            })}
            <div>{/* footer goes here */}</div>
          </div>
        </div>
      </div>
      <Modal open={open} close={handleClose} data={modalData} video={video} />
    </div>
  );
}
