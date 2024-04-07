import React, { useState, useRef, useEffect } from "react";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import { FaGithub } from "react-icons/fa6";
import Browse from "./pages/Browse";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";
import NewPopular from "./pages/NewPopular";
import logo from "./assets/logo/copyflix-logo.png";
import styled from "styled-components";

const Header = styled.ul`
  position: sticky;
  margin: 0;
  display: flex;
  padding: 0 2%;
  align-items: center;
  user-select: none;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 10;
  overflow: visible;
  background: ${(props) =>
    props.navColor
      ? "black"
      : "linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, transparent)"};
  list-style-type: none;
  transition: background 200ms linear;
  font-size: small;

  li {
    display: inline;
    font-size: 0.7vw;
    list-style-type: none;
  }
  li a {
    color: lightgrey;
    text-decoration: none;
    padding: 0.7vw;
    display: inline-block;
  }
`;

const App = () => {
  const [searchBox, setSearchBox] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [navBackground, setNavBackground] = useState(false);
  const inputRef = useRef(null);
  const navRef = useRef();
  navRef.current = navBackground;

  useEffect(() => {
    const handleScroll = () => {
      const visible = window.scrollY > 50;
      if (visible) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scorll", handleScroll);
    };
  });

  const toggleSearchBox = () => {
    if (!searchBox && inputRef.current) {
      inputRef.current.focus();
    }
    setSearchBox((prevState) => !prevState);
  };

  return (
    <Router basename="/Browse">
      <div>
        <Header navColor={navRef.current}>
          <li>
            <NavLink exact to="/">
              <a href="d" className="logo">
                <img className="logo" src={logo} alt="" />
              </a>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/TVShows">TV Shows</NavLink>
          </li>
          <li>
            <NavLink to="/Movies">Movies</NavLink>
          </li>
          <li>
            <NavLink to="/NewPopular">New & Popular</NavLink>
          </li>
          <li>
            <NavLink to="/List">My List</NavLink>
          </li>
          <li>
            <NavLink to="/Language">Browse by Languages</NavLink>
          </li>
          <div className="header-options">
            <div className={`${searchBox ? "searchBox" : "searchIcon"}`}>
              <span className="icon" onClick={() => toggleSearchBox()}>
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                className="searchInput"
                ref={inputRef}
                onBlur={() => setSearchBox(false)}
                type="text"
                placeholder="Titles, people, genres"
                maxLength="80"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div>
              <span className="kidText">Kids</span>
            </div>
            <div>
              <span className="icon">
                <FontAwesomeIcon icon={faBell} />
              </span>
            </div>
            <div>
              <a
                className="gitIcon"
                href="https://github.com/frontierSpaceAlien/Copyflix"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </Header>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Browse />} />
            <Route path="/TVShows" element={<TVShows />} />
            <Route path="/Movies" element={<Movies />} />
            <Route path="/NewPopular" element={<NewPopular />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
