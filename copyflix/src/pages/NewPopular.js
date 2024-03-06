import React, { useState, useEffect } from "react";
import Sliders from "../components/slider/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getPopularTV,
  getAiringToday,
  getGenres,
  getTVGenre,
} from "../data/data";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";

export default function Browse() {
  const [diffData, setDiffData] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
        const movieGenres = await getGenres();
        const tvGenres = await getTVGenre();
        const popularMovies = await getPopularMovies(movieGenres);
        const nowPlaying = await getNowPlayingMovies(movieGenres);
        const upcomingMovies = await getUpcomingMovies(movieGenres);
        const popularTV = await getPopularTV(tvGenres);
        const airingToday = await getAiringToday(tvGenres);
        var newPop = [];

        newPop.push(popularMovies);
        newPop.push(nowPlaying);
        newPop.push(upcomingMovies);
        newPop.push(popularTV);
        newPop.push(airingToday);

        for (let i = 0; i < newPop.length; i++) {
          newPop[i].push(settings);
        }

        setDiffData(newPop);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);
  var sliderTitles = [
    "Popular Movies",
    "Now Playing Movies",
    "Upcoming Movies",
    "Popluar TV Shows",
    "Airing Today",
  ];

  function updateData(newData) {
    setDiffData(newData);
  }

  function loadedDiv() {
    setLoaded(true);
  }

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
        <div className="slider">
          {diffData.map((movie, i) => {
            return [
              <div>
                <div className="gap" />
                <h2 className="sliderText">{sliderTitles[i]}</h2>
                <Sliders
                  data={movie}
                  index={i++}
                  diffData={diffData}
                  updateData={(newData) => updateData(newData)}
                  checkLoad={loadedDiv}
                  genre={""}
                />
              </div>,
            ];
          })}
          <div>{/* footer goes here */}</div>
        </div>
      </div>
    </div>
  );
}
