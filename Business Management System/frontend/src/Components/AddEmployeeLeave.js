import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import backgroundImage from '../images/b2.png';

function AddEmployeeLeave() {
    const location = useLocation();
    const employee = location.state ? location.state.employee : {
        empId: '',
        firstName: '',
        lastName: '',
        role: '',
    };

    const [formData, setFormData] = useState({
        empId: employee.empId,
        firstName: employee.firstName,
        lastName: employee.lastName,
        role: employee.role,
        leaveType: "",
        leaveFrom: "",
        leaveTo: "",
        leaveStatus: "Pending"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "leaveFrom" || name === "leaveTo") {
            const selectedDate = new Date(value);
            const currentDate = new Date();
            if (selectedDate < currentDate) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please select today or a future date.'
                });
                return;
            }
        }

        if (name === "leaveFrom") {
            const leaveFromDate = new Date(value);
            const leaveToDate = new Date(formData.leaveTo);
            if (leaveToDate && leaveFromDate > leaveToDate) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Leave To date cannot be before Leave From date.'
                });
                return;
            }
        } else if (name === "leaveTo") {
            const leaveToDate = new Date(value);
            const leaveFromDate = new Date(formData.leaveFrom);
            if (leaveFromDate && leaveToDate < leaveFromDate) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Leave To date cannot be before Leave From date.'
                });
                return;
            }
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/api/employees/leave/addEmployeeLeave", formData)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Leave application submitted successfully'
                });
                // Redirect to employee profile page
                window.location.href = `/employee-profile/${employee._id}`; // Adjust the path if needed
            })
            .catch(error => {
                console.error('Error submitting leave application:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to submit leave application. Please try again.'
                });
            });
    };

    return (
        <div className="container mt-4" style={{ background: '#dcfce7' }}>
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

            <h2>Apply for Leave</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="empId" className="form-label">Employee ID</label>
                    <input type="text" className="form-control" id="empId" name="empId" value={formData.empId} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <input type="text" className="form-control" id="role" name="role" value={formData.role} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="leaveType" className="form-label">Leave Type</label>
                    <select className="form-control" id="leaveType" name="leaveType" value={formData.leaveType} onChange={handleChange} required>
                        <option value="" disabled hidden>Select Leave Type</option>
                        <option value="Medical">Medical</option>
                        <option value="Casual">Casual</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="leaveFrom" className="form-label">Leave From</label>
                    <input type="date" className="form-control" id="leaveFrom" name="leaveFrom" value={formData.leaveFrom} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="leaveTo" className="form-label">Leave To</label>
                    <input type="date" className="form-control" id="leaveTo" name="leaveTo" value={formData.leaveTo} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddEmployeeLeave;
