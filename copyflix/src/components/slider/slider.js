import React, { useRef, useState } from "react";
import Slider from "react-slick";
import LeftControl from "../slider-control/LeftControl";
import RightControl from "../slider-control/RightControl";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "../modal/modalMenu";
import { getTrailers, getTvVideos } from "../../data/data";

import { Skeleton } from "@mui/material";
import { FaCirclePlay } from "react-icons/fa6";
import { BsPlusCircle } from "react-icons/bs";
import { BsHandThumbsUp } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";

var xAxis = "0";
var boxIndex = "0";
var findLastSlideAmount = "0";
const StyledSlider = styled(Slider)`
  .slick-slide {
    z-index: 10000;
    box-sizing: border-box;
    outline: none;
    transition: box-shadow 500ms, transform 200ms ease-in-out;
    user-select: none !important;
    &:hover {
      transform: scale(1.4) translateY(-15%)
        translateX(${(props) => (props.sliderTranslateX ? xAxis : xAxis)});
      transition-delay: 400ms;
      user-select: none !important;
    }
  }
`;

export default function Sliders(props) {
  const { data, index, diffData, updateData, checkLoad, genre } = props;
  const [mediaData, setMediaData] = useState(data);
  const [sliderState, setSliderState] = useState(false);
  const [sliderTranslateX, setSliderTranslateX] = useState(false);
  const [controlVisible, setControlVisible] = useState(false);
  const [visibleRightArrows, setVisibleRightArrows] = useState(false);
  const [visibleLeftArrows, setVisibleLeftArrows] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = useState("");
  const [video, setVideo] = useState([]);
  const [tvVideo, setTvVideo] = useState([]);
  const slider = useRef(null);
  const sliceData = data.length - 1;
  const settings = data[sliceData];

  // When the user presses next on the slider, this function sets the slider to
  // infinite scroll.
  // It clones the original dataset and finds the index of which slider has been changed.
  // It then updates the original data with new data. This prevents any state bugs since
  // all sliders share the same states.
  function onSlideChange(infi, i) {
    const clonedData = JSON.parse(JSON.stringify(diffData));
    console.log(clonedData);
    clonedData[i][sliceData].infinite = infi;
    updateData(clonedData);
    setSliderState(clonedData[i][sliceData].infinite);
    setControlVisible(infi);
  }

  function onMouseLeave() {
    setSliderTranslateX(false);
    setVisibleRightArrows(false);
    setVisibleLeftArrows(false);
  }

  function onHoverRight(arrowState) {
    if (controlVisible === true) {
      setVisibleLeftArrows(arrowState);
    }
  }

  function onHoverLeft(arrowState) {
    setVisibleRightArrows(arrowState);
  }

  const onHover = (id) => {
    setVisibleRightArrows(true);

    if (controlVisible === true) {
      setVisibleLeftArrows(true);
    }

    for (let index = 0; index < data.length - 1; index++) {
      if (Number(id.alt) === data[index].id) {
        boxIndex = index + 1;

        // Calculates where the first and last index on each slide and adjusts the css accordingly
        // also determines if it is on the last slide.
        if (activeSlide + 6 > sliceData) {
          findLastSlideAmount = Math.abs(activeSlide - sliceData);
          if ((index - findLastSlideAmount) % 6 === 0) {
            setSliderTranslateX(true);
            xAxis = "14%";
          } else if ((index - findLastSlideAmount) % 6 === 5) {
            setSliderTranslateX(true);
            xAxis = "-14%";
          } else {
            setSliderTranslateX(false);
            xAxis = "0";
          }
        } else {
          if (index % 6 === 0) {
            setSliderTranslateX(true);
            xAxis = "14%";
          } else if (index % 6 === 5) {
            setSliderTranslateX(true);
            xAxis = "-14%";
          } else {
            setSliderTranslateX(false);
            xAxis = "0";
          }
        }
      }
    }
  };

  const handleOpen = (data) => {
    setOpen(true);
    setModalData(data);
  };

  const handleClose = () => setOpen(false);

  const imageLoad = () => {
    setLoaded(true);
    checkLoad();
  };

  const getVideo = async (e) => {
    try {
      const videoGet = await getTrailers(e);
      const tvVideo = await getTvVideos(e);

      setVideo([]);
      console.log(videoGet);

      if (videoGet.length > 0) {
        setVideo(videoGet);
      } else if (tvVideo.length > 0) {
        setVideo(tvVideo);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        userSelect: "none",
        outline: "none",
      }}
    >
      <Grid container wrap="nowrap">
        {!loaded &&
          Array.from(new Array(6)).map((item, index) => (
            <Box key={index} sx={{ width: "100%", marginRight: 1, my: 0 }}>
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
      <StyledSlider
        sliderTranslateX={sliderTranslateX}
        boxHover={visibleRightArrows}
        ref={slider}
        {...settings}
        beforeChange={(current, next) => {
          setActiveSlide(next);
        }}
      >
        {mediaData.slice(0, sliceData).map((data) => (
          <div className="box">
            <img
              style={loaded ? {} : { display: "none" }}
              className="box img"
              src={`https://image.tmdb.org/t/p/w780${data.poster_path}`}
              alt={data.id}
              onMouseOver={(e) => onHover(e.currentTarget)}
              onMouseLeave={() => onMouseLeave()}
              onLoad={imageLoad}
              onClick={() => {
                handleOpen(data);
                getVideo(data.id);
              }}
            />
            <div className="box text">
              <div class="icons">
                <FaCirclePlay size={"1.5vw"} className="playButton" />
                <BsPlusCircle size={"1.5vw"} className="addList" />
                <BsHandThumbsUp size={"1.5vw"} className="userRate" />
                <IoIosArrowDropdown
                  size={"1.5vw"}
                  className="moreInfo"
                  onClick={() => handleOpen(data)}
                />
              </div>
              <span class="match">
                {Math.floor(data.vote_average * 10)}% User Score
              </span>
              <span class="rating">{data.original_language.toUpperCase()}</span>
              <span class="releaseDate">{data.release_date}</span>
              <p class="genres">{data.genre_ids.join(" • ")}</p>
            </div>
          </div>
        ))}
      </StyledSlider>
      <LeftControl
        slider={slider}
        visible={sliderState}
        onHover={visibleLeftArrows}
        leftArrowHover={(arrowState) => onHoverLeft(arrowState)}
      />
      <RightControl
        skeletonVisible={loaded}
        slider={slider}
        slideChange={(infi, i) => onSlideChange(infi, i)}
        onHover={visibleRightArrows}
        slideIndex={index}
        rightArrowHover={(arrowState) => onHoverRight(arrowState)}
      />
      <Modal open={open} close={handleClose} data={modalData} video={video} />
    </div>
  );
}
