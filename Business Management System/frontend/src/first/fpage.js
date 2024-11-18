import React from "react";
import { Link } from "react-router-dom";
import "./fpage.css"; // Import the CSS file for styling

function HomePage() {
  return (
    <div className="homepage-container">
      {/* Background image with buttons */}
      <div className="background-image">
        <div className="content-overlay">
          <h1>Welcome to Sunrich Paradise!</h1>
          <div className="buttons">
            <Link to="/reg">
              <button>Register</button>
            </Link>
            <Link to="/log">
              <button>Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

