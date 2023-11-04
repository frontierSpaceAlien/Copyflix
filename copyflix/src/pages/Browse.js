import React, { Component } from "react";
import Slider from "../components/slider/slider";
import apiKey from "../utils/key";

require("../scss/App.scss");

export class Browse extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  async componentDidMount() {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
    );
    const data = await res.json();

    this.setState({ movies: data.results });
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="App">
        <div className="slideView">
          <h2 style={{ color: "lightgrey" }}> Popular on Copyflix</h2>
        </div>
        <Slider movies={movies} />
      </div>
    );
  }
}

export default Browse;
