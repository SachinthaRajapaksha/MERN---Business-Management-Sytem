// Header.js

import React from "react";
import { Link } from "react-router-dom";

function Header() {
  
  return (
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid" >
        
        <Link className="navbar-brand" to="/"></Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/employee-admin-dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-employee">Employee Registration</Link>
            </li>
            
            <li className="nav-item">
              <Link to="/employee-table" className="nav-link">Employee Table</Link>
            </li>
            <li className="nav-item">
              <Link to="/employee-leave-table" className="nav-link">Employee Leave Table</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
