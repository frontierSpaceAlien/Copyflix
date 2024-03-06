import React, { useRef, useState } from "react";
import Slider from "react-slick";
import LeftControl from "../slider-control/LeftControl";
import RightControl from "../slider-control/RightControl";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Skeleton } from "@mui/material";
import { FaPlay } from "react-icons/fa";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "100%",
  width: "70%",
  height: "fit-content",
  userSelect: "none",
  borderRadius: "10px",
  boxShadow: "0px 0px 5px 0px #000000",
  backgroundColor: "#181818",
  outline: "none",
};

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
  const slider = useRef(null);
  const sliceData = data.length - 1;
  const settings = data[sliceData];

  // When the user presses next on the slider, this function sets the slider to
  // infinite scroll.
  // It clones the original dataset and finds the index of which slider has been changed.
  // It then updates the original data with new data. This prevents any state bugs since
  // all sliders share the same states.
  function onSlideChange(infi, i) {
    console.log(i);
    const clonedData = JSON.parse(JSON.stringify(diffData));
    console.log(clonedData);
    clonedData[i][sliceData].infinite = infi;
    updateData(clonedData);
    setSliderState(clonedData[i][sliceData].infinite);
    setControlVisible(infi);
    console.log(i);
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
              onClick={() => handleOpen(data)}
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
      <Modal
        style={{ overflow: "scroll" }}
        open={open}
        onClose={handleClose}
        slotProps={{
          backdrop: {
            style: { backgroundColor: "rgba(0,0,0, 0.6)" },
          },
        }}
      >
        <Box sx={style}>
          <img
            className="modalImage"
            src={`https://image.tmdb.org/t/p/w1280${modalData.backdrop_path}`}
            alt={"backdropImage"}
          />
          <p className="modalTitle">{modalData.title}</p>
          <div className="modalButtons">
            <FaPlay
              style={{ marginRight: "6%", marginLeft: "20%" }}
              size={"1.3vw"}
            />
            <p>Play</p>
          </div>
          <div className="modalButtonExtra">
            <BsPlusCircle size={"2.5vw"} className="addList" />
            <BsHandThumbsUp size={"2.5vw"} className="userRate" />
          </div>
          <div className="modalMediaInfo">
            <div className="modalRatings">
              <p className="modalInfo" style={{ color: "#43c662" }}>
                {Math.round(modalData.vote_average * 10) / 10}/10
              </p>
              <p className="modalInfo" style={{ color: "#A3A3A3" }}>
                {modalData.original_language === undefined
                  ? ""
                  : modalData.original_language.toUpperCase()}
              </p>
              <p className="modalInfo" style={{ color: "#A3A3A3" }}>
                {modalData.release_date}
              </p>
            </div>
            <div className="modalInfoContainer">
              <p className="modalInfo">{modalData.overview}</p>
            </div>
            <div className="modalCastContainer">
              <p className="modalCast" style={{ color: "#676767" }}>
                Vote Count:
              </p>
              <p className="voteCount">{modalData.vote_count}</p>
              <p className="modalCast" style={{ color: "#676767" }}>
                Genres:
              </p>
              <p className="genreModal">
                {modalData.genre_ids === undefined
                  ? ""
                  : modalData.genre_ids.join(", ")}
              </p>
              <p className="modalCast" style={{ color: "#676767" }}>
                Popularity Score :
              </p>
              <p className="popularityScore">
                {Math.floor(modalData.popularity)}
              </p>
            </div>
          </div>
          <p
            style={{
              color: "white",
              fontWeight: "bold",
              marginLeft: "4%",
              fontSize: "1.5vw",
            }}
          >
            More like this
          </p>
          <p
            style={{
              color: "white",
              fontWeight: "bold",
              marginLeft: "4%",
              fontSize: "1vw",
            }}
          >
            i make this section later
          </p>
        </Box>
      </Modal>
    </div>
  );
}
