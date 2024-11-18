import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import backgroundImage from '../images/b2.png';

function EmployeeAttendanceTable() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees
    axios.get("http://localhost:4000/api/employees/getEmployees")
      .then(response => {
        setEmployees(response.data);
        // Once employees are fetched, fetch attendance status for each employee
        fetchAttendanceStatus(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const fetchAttendanceStatus = async (employees) => {
    const date = new Date().toISOString().slice(0, 10); // Get today's date
    try {
      const attendanceStatusResponse = await axios.get(`http://localhost:4000/api/employees/attendance/all-today`);
      const attendanceStatusData = attendanceStatusResponse.data;

      // Merge attendance status data with employee data
      const updatedEmployees = employees.map(employee => {
        const attendance = attendanceStatusData.find(item => item.empId === employee.empId);
        if (attendance) {
          return {
            ...employee,
            attendanceStatus: attendance.status
          };
        }
        return employee;
      });

      setEmployees(updatedEmployees);
    } catch (error) {
      console.error('Error fetching attendance status:', error);
    }
  };

  return (
    <div className="container mt-4" style={{ background: '#dcfce7', padding:'50px' }}>
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


      <h2>Employee Attendance Table - Today's Attendance</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Employee ID</th>
            <th>Full Name</th>
            <th>Attendance Status</th>
            <th>Date</th>
            <th>Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.empId}</td>
              <td>{employee.firstName} {employee.lastName}</td>
              <td>{employee.attendanceStatus || "Absent"}</td>
              <td>{employee.attendanceStatus === "present" ? new Date().toLocaleDateString() : "-"}</td>
              <td>{employee.attendanceStatus === "present" ? new Date().toLocaleTimeString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeAttendanceTable;