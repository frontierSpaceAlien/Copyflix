import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function Sliders(props) {
  const [sliderState, setSliderState] = useState(false);
  const { data } = props;
  const slider = React.useRef(null);
  const settings = data[42];
  const sliceData = data.length - 1;

  function onSlideChange() {
    slider?.current?.slickNext();
    setSliderState((data[sliceData].infinite = true));
  }

  function onBoxClick(id) {
    console.log("Box Clicked! - " + id.alt);
  }

  return (
    <div>
      <Slider ref={slider} {...settings}>
        {data.slice(0, sliceData).map((data) => {
          return (
            <div>
              <img
                className="slideImage"
                src={`http://image.tmdb.org/t/p/w780${data.backdrop_path}`}
                alt={data.title}
                onClick={(e) => onBoxClick(e.currentTarget)}
              />
            </div>
          );
        })}
      </Slider>
      <button onClick={() => slider?.current?.slickPrev()}>Prev</button>
      <button onClick={() => onSlideChange()}>Next</button>
    </div>
  );
}
