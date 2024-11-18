import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <aside
        id="sidebar"
        style={{
            position: 'fixed',
            top: '56px',
            left: 0,
            width: collapsed ? '70px' : '329px',
            zIndex: 1000,
            transition: 'left 0.5s ease-in-out',
            backgroundColor: '#E3E5E4',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            height: '100vh'
          }}
      >
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ paddingTop: '6px', paddingLeft: '20px', paddingRight: '70px', paddingBottom:'20px' }}
        >
          <button style={{ backgroundColor: 'transparent', border: '1px solid #0B8735', borderRadius: '5px', color: '#0B8735', fontSize: '20px' }} onClick={toggleSidebar}>
            <i className="bi bi-justify"></i>
          </button>

          {!collapsed && (
            <div className="sidebar-logo">
              <a
                href="#"
                style={{
                  color: "#0B8735",
                  fontSize: "17px",
                  fontWeight: "600",
                  textDecoration: "none",
                  marginLeft: '5px'
                }}
              >
                Supplier Management
              </a>
            </div>
          )}
        </div>

        

        <div className="bg-light border  rounded-3 p-1 h-100 sticky-top" style={{ margin: '10px'}} >
          <ul class="nav nav-pills flex-sm-column flex-row mb-auto "  >
            {!collapsed && (
              <>
                <li className="sidebar-item">
                  <a
                    href="/suppliers/home"
                    className="sidebar-link"
                    style={{
                      padding: "0.75rem 1.5rem",
                      color: "#0B8735",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "16px",
                      textDecoration: "none",
                      border: "2px solid transparent",
                      transition: "background-color 0.3s ease",
                      borderRadius: "0.5rem"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = "#0B8735";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = "#fff";
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#0B8735";
                    }}
                  >
                    <i
                      className="bi-clipboard-data"
                      style={{ fontSize: "1.1rem", marginRight: ".75rem" }}
                    ></i>
                    <span>Supplier Registration & Management</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    href="/suppliers/order"
                    className="sidebar-link"
                    style={{
                      padding: "0.75rem 1.5rem",
                      color: "#0B8735",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "16px",
                      textDecoration: "none",
                      border: "2px solid transparent",
                      transition: "background-color 0.3s ease",
                      borderRadius: "0.5rem"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = "#0B8735";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = "#fff";
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#0B8735";
                    }}
                  >
                    <i
                      className="bi-currency-dollar"
                      style={{ fontSize: "1.1rem", marginRight: ".75rem" }}
                    ></i>
                    <span>Make Orders</span>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

      </aside>
    </div>
  );
};

export default Sidebar;