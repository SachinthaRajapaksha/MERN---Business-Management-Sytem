import React from 'react';
import backgroundImage from '../images/b2.png'

const AdminDashboard = () => {
  const cardStyle = {
    height: '200px',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const hiddenLinkStyle = {
    position: 'absolute',
    top: 0,
    right: '-100%',
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'right 0.5s',
    textDecoration: 'none',
    borderRadius: '10px',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.querySelector('.hidden-link').style.right = '0';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.querySelector('.hidden-link').style.right = '-100%';
  };

  return (
    <div className="container">
      <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }} />

      <div className="col-md-6" style={{ marginTop:'30px', marginLeft:'0px', marginBottom:'30px', width:'1290px'}} >
        <div className="card bg-dark text-white">
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Admin Dashboard</h1>
          </div>
        </div>
      </div>

      <hr style={{ width: '100%', borderColor: '#000000 ', borderWidth: '5px' }} />

      <div className="row justify-content-center" style={{ marginTop: '55px' }} >
        {/* Employee Management Card */}
        <div className="col-md-3">
          <div
            className="card financial-management shadow-lg"
            style={{ ...cardStyle, backgroundColor: '#3AF462' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-body">
              <h2 style={{ marginTop: '15px' }}>Employee Management</h2>
              <a href="/employee-admin-dashboard" className="hidden-link" style={hiddenLinkStyle}>
                Go to Employee Management System
              </a>
            </div>
          </div>
        </div>

        {/* Customer Management Card */}
        <div className="col-md-3">
          <div
            className="card financial-management shadow-lg"
            style={{ ...cardStyle, backgroundColor: '#28B045' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-body">
              <h2 style={{ marginTop: '15px' }}>Customer Management</h2>
              <a href="/financial-management" className="hidden-link" style={hiddenLinkStyle}>
                Go to Customer Management System
              </a>
            </div>
          </div>
        </div>

        {/* Financial Management Card */}
        <div className="col-md-3">
          <div
            className="card financial-management shadow-lg"
            style={{ ...cardStyle, backgroundColor: '#3AF462' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-body">
              <h2 style={{ marginTop: '15px' }}>Financial Management</h2>
              <a href="/Financial/dash" className="hidden-link" style={hiddenLinkStyle}>
                Go to Financial Management System
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card financial-management shadow-lg"
            style={{ ...cardStyle, backgroundColor: '#28B045' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-body">
              <h2 style={{ marginTop: '15px' }}>Order Management</h2>
              <a href="/financial-management" className="hidden-link" style={hiddenLinkStyle}>
                Go to Order Management System
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card financial-management shadow-lg"
            style={{ ...cardStyle, backgroundColor: '#28B045' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-body">
              <h2 style={{ marginTop: '15px' }}>Product Management</h2>
              <a href="/financial-management" className="hidden-link" style={hiddenLinkStyle}>
                Go to Product Management System
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card financial-management shadow-lg"
            style={{ ...cardStyle, backgroundColor: '#3AF462' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-body">
              <h2 style={{ marginTop: '15px' }}>Quality Management</h2>
              <a href="/financial-management" className="hidden-link" style={hiddenLinkStyle}>
                Go to Quality Management System
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card financial-management shadow-lg"
            style={{ ...cardStyle, backgroundColor: '#28B045' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-body">
              <h2 style={{ marginTop: '15px' }}>Supplier Management</h2>
              <a href="/suppliers/home" className="hidden-link" style={hiddenLinkStyle}>
                Go to Supplier Management System
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card financial-management shadow-lg"
            style={{ ...cardStyle, backgroundColor: '#3AF462' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-body">
              <h2 style={{ marginTop: '15px' }}>Inventory Management</h2>
              <a href="/financial-management" className="hidden-link" style={hiddenLinkStyle}>
                Go to Inventory Management System
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
