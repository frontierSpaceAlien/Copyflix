import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
let xAxis = "0";

const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 0 4px;
    transition: transform 200ms ease-in-out;
    box-sizing: border-box;
    user-select: none;
    &:hover {
      transform: scale(1.4) translateY(-54px)
        translateX(${(props) => (props.sliderX ? xAxis : (xAxis = "0"))});
      transition: transform 200ms ease-out;
      transition-delay: 400ms;
      user-select: none;
    }
  }
`;

export default function Sliders(props) {
  const { data } = props;
  const [sliderState, setSliderState] = useState(false);
  const [sliderX, setSliderX] = useState(false);
  const slider = React.useRef(null);
  const sliceData = data.length - 1;
  const settings = data[sliceData];

  function onSlideChange() {
    slider?.current?.slickNext();
    setSliderState((data[sliceData].infinite = true));
  }

  function onBoxClick(id) {
    console.log("Box Clicked! - " + id.alt);
  }

  function onMouseOut() {
    setSliderX(false);
  }

  function onHover(id) {
    xAxis = "0";
    for (var index = 0; index < data.length - 1; index++) {
      if (Number(id.alt) === data[index].id) {
        xAxis = "0";
        console.log("hovering this image - " + data[index].original_title);
        if (index % 6 === 0) {
          setSliderX(true);
          xAxis = "40px";
        } else if (index % 6 === 5) {
          setSliderX(true);
          xAxis = "-40px";
        } else {
          setSliderX(false);
        }
      }
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <StyledSlider sliderX={sliderX} ref={slider} {...settings}>
        {data.slice(0, sliceData).map((data) => {
          return (
            <div>
              <img
                className="img"
                src={`http://image.tmdb.org/t/p/w780${data.backdrop_path}`}
                alt={data.id}
                onClick={(e) => onBoxClick(e.currentTarget)}
                onMouseOver={(e) => onHover(e.currentTarget)}
                onMouseOut={() => onMouseOut()}
              />
            </div>
          );
        })}
      </StyledSlider>
      <button
        className="slider-left"
        onClick={() => slider?.current?.slickPrev()}
      >
        Prev
      </button>
      <button className="slider-right" onClick={() => onSlideChange()}>
        Next
      </button>
    </div>
  );
}
