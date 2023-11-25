import React, { useState } from "react";
import Slider from "react-slick";
import LeftControl from "../slider-control/LeftControl";
import RightControl from "../slider-control/RightControl";
import styled from "styled-components";

var xAxis = "0";
const StyledSlider = styled(Slider)`
  .img {
    width: 100%;
    border-radius: 4px;
    box-shadow: 0px 0px 5px 0px #000000;
    transition: transform 200ms ease-in-out;
    user-select: none;
    cursor: pointer;
    &:hover {
      transition: box-shadow 500ms transform 200ms ease-out;
      transform: scale(1.4) translateY(-67px)
        translateX(${(props) => (props.sliderX ? xAxis : (xAxis = "0"))});
      transition-delay: 400ms;
      user-select: none !important;
    }
  }
`;

export default function Sliders(props) {
  const { data } = props;
  const [sliderState, setSliderState] = useState(false);
  const [sliderX, setSliderX] = useState(false);
  const [controlVisible, setControlVisible] = useState(false);
  const [visibleRightArrows, setVisibleRightArrows] = useState(false);
  const [visibleLeftArrows, setVisibleLeftArrows] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const slider = React.useRef(null);
  const sliceData = data.length - 1;
  const settings = data[sliceData];

  function onSlideChange(infi) {
    data[sliceData].infinite = infi;
    setSliderState(data[sliceData].infinite);
    setControlVisible(infi);
  }

  function onBoxClick(id) {
    console.log("Box Clicked! - " + id.alt);
  }

  function onMouseOut() {
    setSliderState((data[sliceData].infinite = sliderState));
    setSliderX(false);
    setVisibleRightArrows(false);
    setVisibleLeftArrows(false);
  }

  function onHoverRight(arrowState) {
    setSliderState((data[sliceData].infinite = sliderState));
    if (controlVisible === true) {
      setVisibleLeftArrows(arrowState);
    }
  }

  function onHoverLeft(arrowState) {
    setSliderState((data[sliceData].infinite = sliderState));
    setVisibleRightArrows(arrowState);
  }

  function onHover(id) {
    xAxis = "0";
    setSliderState((data[sliceData].infinite = sliderState));
    setVisibleRightArrows(true);
    if (controlVisible === true) {
      setVisibleLeftArrows(true);
    }
    console.log("current slide index = " + activeSlide);
    // console.log(data.length - 1);

    for (var index = 0; index < data.length - 1; index++) {
      if (Number(id.alt) === data[index].id) {
        console.log("current index: " + index);
        console.log("size of data array: " + sliceData);

        // checks for uneven slide count and adjusts the css accordingly
        // also determines if it is on the last slide.
        if (activeSlide + 6 > sliceData) {
          console.log("index if adjusting for uneven: " + ((index - 2) % 6));
          if ((index - 2) % 6 === 0) {
            setSliderX(true);
            xAxis = "45px";
          } else if ((index - 2) % 6 === 5) {
            setSliderX(true);
            xAxis = "-45px";
          } else {
            setSliderX(false);
          }
        } else {
          if (index % 6 === 0) {
            setSliderX(true);
            xAxis = "45px";
          } else if (index % 6 === 5) {
            setSliderX(true);
            xAxis = "-45px";
          } else {
            setSliderX(false);
          }
        }
      }
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <StyledSlider
        sliderX={sliderX}
        ref={slider}
        {...settings}
        beforeChange={(current, next) => {
          setActiveSlide(next);
        }}
      >
        {data.slice(0, sliceData).map((data) => {
          return (
            <div>
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w780${data.backdrop_path}`}
                alt={data.id}
                onClick={(e) => onBoxClick(e.currentTarget)}
                onMouseEnter={(e) => onHover(e.currentTarget)}
                onMouseOut={() => onMouseOut()}
              />
            </div>
          );
        })}
      </StyledSlider>
      <LeftControl
        slider={slider}
        visible={sliderState}
        onHover={visibleLeftArrows}
        leftArrowHover={(arrowState) => onHoverLeft(arrowState)}
      />
      <RightControl
        slider={slider}
        slideChange={(infi) => onSlideChange(infi)}
        onHover={visibleRightArrows}
        rightArrowHover={(arrowState) => onHoverRight(arrowState)}
      />
    </div>
  );
}
