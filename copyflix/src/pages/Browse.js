import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import run1 from "../assets/run1.png"
import run2 from "../assets/run2.png"
import run3 from "../assets/run3.png"

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

class Browse extends Component {
  render() {

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    }

    return (
      <div className="slideView">
        <h2 style={
            { color: "lightgrey" }}> Popular on Copyflix</h2>
          <Slider {...settings}>
            <img className="cardImg" src={run1}  alt="man run"/>
            <img className="cardImg" src={run2}  alt="man run" />
            <img className="cardImg" src={run3}  alt="man run"/>
          </Slider>
      </div>
    );
  }
} 
export default Browse;
