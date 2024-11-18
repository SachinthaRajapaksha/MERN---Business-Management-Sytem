import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaUser } from 'react-icons/fa';
import './adminMain.css'; // Import the external CSS file

const Home = () => {
  const navigate = useNavigate();

  const handleReportGenerationClick = () => {
    navigate('/report');
  };

  const handleUserManagementClick = () => {
    navigate('/registered');
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#00563B', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white' }}>Customer Administrator Dashboard</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 60px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button style={{ backgroundColor: '#00563B', color: 'white', border: 'none', padding: '20px 40px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '20px', margin: '20px', cursor: 'pointer', borderRadius: '10px', transition: 'background-color 0.3s' }} onClick={handleReportGenerationClick}>
            <FaFileAlt /> Report Generation
          </button>
          
          <button style={{ backgroundColor: '#00563B', color: 'white', border: 'none', padding: '20px 40px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '20px', margin: '20px', cursor: 'pointer', borderRadius: '10px', transition: 'background-color 0.3s' }} onClick={handleUserManagementClick}>
            <FaUser /> User Management
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
