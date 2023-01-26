import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/images/movie1.png"
import image2 from "../assets/images/movie2.png"
import image3 from "../assets/images/movie3.png"
import image4 from "../assets/images/movie4.png"
import image5 from "../assets/images/movie5.png"
import image6 from "../assets/images/movie6.png"
import image7 from "../assets/images/movie7.png"
import image8 from "../assets/images/movie8.png"
import image9 from "../assets/images/movie9.png"
import image10 from "../assets/images/movie10.png"
import image11 from "../assets/images/movie11.png"
import image12 from "../assets/images/movie12.png"
let slidesToShow = 6.5;

const movies = [
  {
    id: 1,
    image: image1
  },
  {
    id: 2,
    image: image2
  },
  {
    id: 3,
    image: image3
  },
  {
    id: 4,
    image: image4
  },
  {
    id: 5,
    image: image5
  },
  {
    id: 6,
    image: image6
  },
  {
    id: 7,
    image: image7
  },
  {
    id: 8,
    image: image8
  },
  {
    id: 9,
    image: image9
  },
  {
    id: 10,
    image: image10
  },
  {
    id: 11,
    image: image11
  },
  {
    id: 12,
    image: image12
  },
]


function NextArrow(props) {
  const { style, onClick, slideCount, currentSlide } = props;
  console.log(slidesToShow)
  return (
    <>
    {currentSlide !== slideCount - slidesToShow && (
        <div
          className="slider-next"
          style={{ ...style, display: "block"}}
          onClick={onClick}
          />
    )}
    </>
  );
}

function PrevArrow(props) {
  const { style, onClick, currentSlide } = props;
  console.log(currentSlide)
  return (
    <>
    {currentSlide !== 0 && (
      <div
      className="slider-right"
      style={{ ...style, display: "block"}}
      onClick={onClick}
      />
      )}
    </>
  );
}

class Browse extends Component {
  render() {

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 6,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    }

    return (
      <div className="slideView">
        <h2 style={
            { color: "lightgrey" }}> Popular on Copyflix</h2>
        <div className="slideBox">       
          <Slider {...settings}>
            {movies.map((movie) => { return <img className="cardImg" key={movie.id} src={movie.image}  alt="movies"/>})}
          </Slider>
        </div>
      </div>
    );
  }
} 
export default Browse;
