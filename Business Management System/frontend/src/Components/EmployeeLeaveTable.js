import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import moment from 'moment';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import backgroundImage from '../images/b2.png';

function EmployeeLeaveTable() {
  const [employeeLeaveList, setEmployeeLeaveList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("pending");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedWeek, setSelectedWeek] = useState(moment().week());
  const chartRef = useRef(null);

  useEffect(() => {
    fetchEmployeeLeaveData();
  }, []);

  const fetchEmployeeLeaveData = () => {
    axios.get("http://localhost:4000/api/employees/leave/getEmployeeLeave")
      .then((response) => {
        setEmployeeLeaveList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee leave data:', error);
      });
  };

  const filterLeavesByCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
  };

  const generateMonthReport = () => {
    axios.get(`http://localhost:4000/api/employees/leave/leaveReport/month/${selectedYear}/${selectedMonth}`)
      .then((response) => {
        displayReport(response.data);
        renderChart(response.data);
      })
      .catch((error) => {
        console.error('Error fetching month report:', error);
      });
  };

  const displayReport = (reportData) => {
    Swal.fire({
      title: 'Leave Report',
      html: `
            <p>Total Leaves: ${reportData.totalLeaves}</p>
            <p>Pending Leaves: ${reportData.pendingLeaves}</p>
            <p>Accepted Leaves: ${reportData.acceptedLeaves}</p>
            <p>Rejected Leaves: ${reportData.rejectedLeaves}</p>
        `,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  };

  const renderChart = (data) => {
    const totalLeaves = data.totalLeaves;
    const pendingLeaves = data.pendingLeaves;
    const acceptedLeaves = data.acceptedLeaves;
    const rejectedLeaves = data.rejectedLeaves;
    const totalEmployees = data.totalEmployees;

    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Pending", "Accepted", "Rejected", "Total"],
        datasets: [{
          data: [pendingLeaves, acceptedLeaves, rejectedLeaves, totalLeaves],
          backgroundColor: [
            'yellow', // Pending Leaves
            'green', // Accepted Leaves
            'red', // Rejected Leaves
            'blue' // Total Leaves
          ],
        }],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Monthly Leave Report',
            font: {
              size: 20
            }
          },
          legend: {
            display: true,
            position: 'bottom',
          }
        },
        aspectRatio: 1,
      }
    });
  };


  const generatePDFReport = () => {
    const doc = new jsPDF();
    const canvas = chartRef.current;
    const imgData = canvas.toDataURL("image/png");

    doc.text("Monthly Leave Report", 10, 10);
    doc.addImage(imgData, "PNG", 10, 20, 180, 150);
    doc.save("monthly_leave_report.pdf");
  };

  const handleAccept = (id) => {
    updateLeaveStatus(id, "Accepted");
  };

  const handleReject = (id) => {
    updateLeaveStatus(id, "Rejected");
  };

  const updateLeaveStatus = (id, status) => {
    axios.put(`http://localhost:4000/api/employees/leave/updateEmployeeLeave/${id}`, { leaveStatus: status })
      .then(() => {
        fetchEmployeeLeaveData(); // Refresh leave list after status update
        Swal.fire({
          title: 'Success!',
          text: `Leave ${status.toLowerCase()} successfully!`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch((error) => {
        console.error(`Error ${status.toLowerCase()}ing leave:`, error);
        Swal.fire({
          title: 'Error!',
          text: `Failed to ${status.toLowerCase()} leave. Please try again.`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  const filteredLeaves = employeeLeaveList.filter((leave) => {
    if (selectedCategory === "pending") {
      return leave.leaveStatus === "Pending";
    } else if (selectedCategory === "accepted") {
      return leave.leaveStatus === "Accepted";
    } else if (selectedCategory === "rejected") {
      return leave.leaveStatus === "Rejected";
    }
  });

  return (
    <div className="container mt-4" style={{ background: '#dcfce7', padding: '50px' }}>
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

      <h2>Employee Leave List</h2>
      <div className="mb-3">
        <button onClick={() => filterLeavesByCategory("pending")} className={selectedCategory === "pending" ? "btn btn-primary me-2" : "btn btn-outline-primary me-2"}>Pending Leave</button>
        <button onClick={() => filterLeavesByCategory("accepted")} className={selectedCategory === "accepted" ? "btn btn-primary me-2" : "btn btn-outline-primary me-2"}>Accepted Leave</button>
        <button onClick={() => filterLeavesByCategory("rejected")} className={selectedCategory === "rejected" ? "btn btn-primary" : "btn btn-outline-primary"}>Rejected Leave</button>
      </div>
      <div className="mb-3">
        <label className="me-2">Year:</label>
        <input type="number" value={selectedYear} onChange={handleYearChange} className="form-control me-2" />
        <label className="me-2">Month:</label>
        <input type="number" value={selectedMonth} onChange={handleMonthChange} className="form-control me-2" />
        <button onClick={generateMonthReport} className="btn btn-primary me-2">Generate Month Report</button>
        <button onClick={generatePDFReport} className="btn btn-primary">Download Report as PDF</button>
      </div>
      <div className="monthly-report-container"> {/* New container for the monthly leave report */}
        <h2></h2>
        <div className="monthly-report">
          {/* Monthly leave report content goes here */}
          <canvas ref={chartRef} style={{ width: '300px', height: '300px' }}></canvas> {/* Pie chart */}
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Leave Type</th>
            <th>Leave From</th>
            <th>Leave To</th>
            <th>Leave Status</th>
            {selectedCategory === "pending" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.empId}</td>
              <td>{leave.firstName} {leave.lastName}</td>
              <td>{leave.role}</td>
              <td>{leave.leaveType}</td>
              <td>{new Date(leave.leaveFrom).toLocaleDateString()}</td>
              <td>{new Date(leave.leaveTo).toLocaleDateString()}</td>
              <td>{leave.leaveStatus}</td>
              {selectedCategory === "pending" && (
                <td>
                  <button
                    onClick={() => handleAccept(leave._id)}
                    className="btn btn-success mr-2"
                    disabled={leave.leaveStatus !== "Pending"}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(leave._id)}
                    className="btn btn-danger"
                    disabled={leave.leaveStatus !== "Pending"}
                  >
                    Reject
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeLeaveTable;
