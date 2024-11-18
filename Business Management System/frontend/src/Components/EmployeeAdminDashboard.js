import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link component for navigation
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import backgroundImage from '../images/b2.png';

function EmployeeAdminDashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalPendingLeave, setTotalPendingLeave] = useState(0);

  useEffect(() => {
    fetchTotalEmployees();
    fetchTotalPendingLeave();
  }, []);

  const fetchTotalEmployees = () => {
    axios.get("http://localhost:4000/api/employees/getTotalEmployees")
      .then(response => {
        setTotalEmployees(response.data.totalEmployees);
      })
      .catch(error => {
        console.error("Error fetching total number of employees:", error);
      });
  };

  const fetchTotalPendingLeave = () => {
    axios.get("http://localhost:4000/api/employees/leave/getPendingLeaveCount")
      .then(response => {
        setTotalPendingLeave(response.data.totalPendingLeave);
      })
      .catch(error => {
        console.error("Error fetching total pending leave:", error);
      });
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: "#dcfce7", padding:'50px' }}>
      <div
        style={{
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

      <div>
        <Navbar />
        <Sidebar />
      </div>


      <h2>Employee Admin Dashboard</h2>
      <div className="dashboard-item-container">

        <Link to="/employee-table" className="dashboard-item">
          <div className="dashboard-item-content">
            <h3>Total Employees</h3>
            <p>{totalEmployees}</p>
          </div>
        </Link>

        <Link to="/employee-leave-table" className="dashboard-item">
          <div className="dashboard-item-content">
            <h3>Total Pending Leave</h3>
            <p>{totalPendingLeave}</p>
          </div>
        </Link>

        <Link to="/add-employee" className="dashboard-item">
          <div className="dashboard-item-content">
            <h3>New Employee Registration</h3>
          </div>
        </Link>

        <Link to="/employee-table" className="dashboard-item">
          <div className="dashboard-item-content">
            <h3>All Employees Details</h3>
          </div>
        </Link>

        <Link to="/employee-leave-table" className="dashboard-item">
          <div className="dashboard-item-content">
            <h3>All Employees Leave</h3>
          </div>
        </Link>

      </div>

      <style jsx>{`
        .dashboard-item-container {
          display: flex;
        }

        .dashboard-item {
          flex: 1;
          height: 150px;
          margin-right: 20px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
          cursor: pointer;
          text-decoration: none; /* Remove underline */
          color: #333; /* Set text color */
          transition: background-color 0.3s ease; /* Add transition effect */
        }

        .dashboard-item:hover {
          background-color: #e0e0e0; /* Change background color on hover */
        }

        .dashboard-item-content {
          text-align: center;
        }

        .dashboard-item-content h3 {
          margin-bottom: 10px;
          color: #666; /* Set heading color */
        }

        .dashboard-item-content p {
          font-size: 24px;
          font-weight: bold;
          color: #444; /* Set paragraph color */
        }
      `}</style>
    </div>
  );
}

export default EmployeeAdminDashboard;
