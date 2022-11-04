import React, {useContext, useState, useRef, useEffect} from "react";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faGift, faBell } from '@fortawesome/free-solid-svg-icons'
import Browse from "./pages/Browse";
import logo from "./assets/netflix-logo.png"

const App = () =>  {
  const [searchBox, setSearchBox] = useState(false)
  const inputRef = useRef(null)

  // const SearchContext = React.createContext(null);
  // const { searchInput, updateSearchInput } = useContext(SearchContext)


  const toggleSearchBox = () => {

    if (!searchBox && inputRef.current) inputRef.current.focus();

    setSearchBox(prevState => !prevState)

}
  return (
        <Router basename="/Browse">
          <div>
              <ul className="header">
                <li>
                  <NavLink exact to = "/">
                    <a href="d" className="logo">
                      <img className="logo" src={logo} alt=""/>
                    </a>
                  </NavLink>
                </li>
                <li><NavLink to = "/">Home</NavLink></li>
                <li><NavLink to = "/TVShows">TV Shows</NavLink></li>
                <li><NavLink to = "/Movies">Movies</NavLink></li>
                <li><NavLink to = "/NewPopular">New & Popular</NavLink></li>
                <li><NavLink to = "/List">My List</NavLink></li>
                <li><NavLink to = "/Language">Browse by Languages</NavLink></li>
              <div className="header-options">
                <div className={`${searchBox ? "searchBox" : "searchIcon"}`}>   
                  <span className="icon" onClick={() => toggleSearchBox()}><FontAwesomeIcon icon={faSearch} /></span>
                </div>
              </div>
              </ul>
              <div className="content">
                <Routes>
                  <Route exact path="/" element={<Browse />} />
                </Routes>
              </div>
          </div>
        </Router>
    );
}
 
export default App;
