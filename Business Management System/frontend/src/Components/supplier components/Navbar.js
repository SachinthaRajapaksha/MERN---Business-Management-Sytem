import React from "react";


const NavBar = () => {


    return (
        <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{
                backgroundColor: "#4ade80",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 1000,
            }}
        >
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">
                                <i class="bi bi-house-fill"></i>
                                <span style={{ marginLeft: "5px" }}>Return to Dashboard</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <span className="navbar-brand mx-4"><center>Supplier Management</center></span>
            </div>
        </nav>
    );
};

export default NavBar;