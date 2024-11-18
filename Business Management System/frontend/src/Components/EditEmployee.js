import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useParams, useNavigate } from "react-router-dom";
import backgroundImage from '../images/b2.png';

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    type: "",
    NIC: "",
    gender: "",
    DOB: "",
    contactNo: "",
    address: "",
    joinedDate: "",
    profilePhoto: null // Initialize profilePhoto as null
  });

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = () => {
    axios.get(`http://localhost:4000/api/employees/getEmployee/${id}`)
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.error("Error fetching employee:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'contactNo' && value.length <= 10 || name === 'NIC' && value.length <= 12 || name !== 'contactNo' && name !== 'NIC') {
      setEmployee(prevEmployee => ({
        ...prevEmployee,
        [name]: value,
        profilePhoto: files && files[0] // Update profile photo if a file is selected
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (employee.contactNo.length !== 10) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Contact number must be exactly 10 digits.',
      });
      return;
    }

    if (employee.NIC.length !== 12) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'NIC must be exactly 12 characters.',
      });
      return;
    }

    const formData = new FormData();
    Object.entries(employee).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios.put(`http://localhost:4000/api/employees/updateEmployee/${id}`, formData)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Employee updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate(`/employee-profile/${id}`); // Redirect to homepage after successful update
        });
      })
      .catch(error => {
        console.error('Error updating employee:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update employee. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };


  return (
    <div className="container py-5" style={{ backgroundColor: "#dcfce7", borderRadius: "10px", padding: "20px" }}>
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



      <h2 className="text-center mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" id="username" className="form-control" name="username" value={employee.username} readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" id="firstName" className="form-control" name="firstName" value={employee.firstName} readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" id="lastName" className="form-control" name="lastName" value={employee.lastName} readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-control" name="email" value={employee.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" className="form-control" name="password" value={employee.password} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select className="form-select" name="role" value={employee.role} readOnly required>
                <option value="" disabled hidden>Login To the system As</option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Supplier Manager">Supplier Manager</option>
                <option value="Inventory Manager">Inventory Manager</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Type</label>
              <input type="text" id="type" className="form-control" name="type" value={employee.type} readOnly />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="NIC" className="form-label">NIC</label>
              <input type="text" id="NIC" className="form-control" name="NIC" value={employee.NIC} readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select id="gender" className="form-select" name="gender" value={employee.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="DOB" className="form-label">Date of Birth</label>
              <input type="date" id="DOB" className="form-control" name="DOB" value={employee.DOB} readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="contactNo" className="form-label">Contact No</label>
              <input type="text" id="contactNo" className="form-control" name="contactNo" value={employee.contactNo} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" id="address" className="form-control" name="address" value={employee.address} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="joinedDate" className="form-label">Joined Date</label>
              <input type="date" id="joinedDate" className="form-control" name="joinedDate" value={employee.joinedDate} readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="profilePhoto" className="form-label">Profile Photo</label>
              <input type="file" id="profilePhoto" className="form-control" onChange={handleChange} name="profilePhoto" />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;


