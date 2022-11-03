import React from "react";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";

const App = () =>  {
    return (
        <Router>
          <div>
              <ul className="header">
                <li><NavLink exact to = "/">NETFLIX</NavLink></li>
                <li><NavLink exact to = "/">Home</NavLink></li>
                <li><NavLink to = "/TVShows">TV Shows</NavLink></li>
                <li><NavLink to = "/Movies">Movies</NavLink></li>
                <li><NavLink to = "/NewPopular">New & Popular</NavLink></li>
                <li><NavLink to = "/List">My List</NavLink></li>
                <li><NavLink to = "/Language">Browse by Languages</NavLink></li>
              </ul>
              <div className="content">
                <Routes>

                </Routes>
              </div>
          </div>
        </Router>
    );
}
 
export default App;
