import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import backgroundImage from '../images/b2.png';

function EmployeeTable() {
  const { id } = useParams();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/api/employees/getEmployees")
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Update the filter logic to include search by job role
  const filteredEmployees = employees.filter(employee => {
    return (employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
      employee.empId.toLowerCase().includes(search.toLowerCase()) ||
      employee.role.toLowerCase().includes(search.toLowerCase())) && // Added job role to the search criteria
      (filter === "all" || employee.gender === filter);
  });

  const handleDelete = async (employeeId) => {
    Swal.fire({
      title: 'Enter the reason for deletion',
      input: 'text',
      inputLabel: 'Reason',
      inputPlaceholder: 'Enter reason for deletion',
      inputAttributes: {
        'aria-label': 'Type your reason here'
      },
      showCancelButton: true,
      confirmButtonText: 'Next',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Second prompt for the date
        Swal.fire({
          title: 'Enter the date of deletion',
          input: 'date',
          inputLabel: 'Date',
          inputValidator: (value) => {
            if (!value) {
              return 'You need to provide a date!'
            }
          },
          confirmButtonText: 'Delete',
          showCancelButton: true
        }).then((dateResult) => {
          if (dateResult.isConfirmed) {
            // Perform the delete operation
            axios.delete(`http://localhost:4000/api/employees/deleteEmployee/${employeeId}`, {
              data: { reason: result.value, date: dateResult.value }
            }).then(response => {
              Swal.fire(
                'Deleted!',
                'Employee has been deleted.',
                'success'
              );
              navigate('/employee-table'); // Redirect as needed
            }).catch(error => {
              Swal.fire(
                'Error!',
                'Failed to delete employee. Please try again.',
                'error'
              );
            });
          }
        });
      }
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


      <h2>Employee Table</h2>
      <div className="mb-3">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="form-control"
          placeholder="Search by name or employee ID"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="filter">Filter by Gender:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Job Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.empId}</td>
              <td>{employee.firstName} {employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>
                <Link to={`/admin-employee-edit/${employee._id}`} className="btn btn-primary">Edit</Link>
                <Link to={`/employee-profile-admin/${employee._id}`} className="btn btn-info ms-2">View</Link>
                <button className="btn btn-danger ms-2" onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
