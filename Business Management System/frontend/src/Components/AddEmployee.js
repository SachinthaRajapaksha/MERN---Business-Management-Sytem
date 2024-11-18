import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import backgroundImage from '../images/b2.png';


export default function AddEmployee() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        type: '',
        NIC: '',
        gender: '',
        DOB: '',
        contactNo: '',
        address: '',
        joinedDate: '',
        profilePhoto: null
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'profilePhoto') {
            setFormData(prev => ({ ...prev, profilePhoto: e.target.files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const validateFields = () => {
        if (formData.contactNo.length !== 10) {
            setError('Contact number must be exactly 10 digits.');
            return false;
        }
        if (formData.NIC.length !== 12) {
            setError('NIC must be exactly 12 characters.');
            return false;
        }
        if (!formData.gender) {
            setError('Please select a gender.');
            return false;
        }
        setError('');
        return true;
    };

    const getCurrentDate = () => {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'profilePhoto') {
                data.append(key, formData[key]);
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post("http://localhost:4000/api/employees/registerEmployee", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Employee registered successfully!',
                timer: 2000,
                onClose: () => {
                    navigate('/login');  // Redirect to login or another page as needed
                }
            });
            setFormData({
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                role: '',
                type: '',
                NIC: '',
                gender: '',
                DOB: '',
                contactNo: '',
                address: '',
                joinedDate: '',
                profilePhoto: null
            });
        } catch (error) {
            console.error('Failed to register. Please check the data.', error);
            setError('Failed to register. Please check the data.');
        }
    };

    return (
        <div className="container mt-4" style={{ backgroundColor: "#dcfce7", padding: "60px", borderRadius: "10px"}}>
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


            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <fieldset>
                    <legend>Employee Registration</legend>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" id="username" className="form-control" placeholder="Username"
                                    value={formData.username} onChange={handleChange} name="username" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text" id="firstName" className="form-control" placeholder="Enter Employee First Name"
                                    value={formData.firstName} onChange={handleChange} name="firstName" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" id="lastName" className="form-control" placeholder="Enter Employee Last Name"
                                    value={formData.lastName} onChange={handleChange} name="lastName" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" id="email" className="form-control" placeholder="Enter Employee Email"
                                    value={formData.email} onChange={handleChange} name="email" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" id="password" className="form-control" placeholder="Enter Password"
                                    value={formData.password} onChange={handleChange} name="password" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select className="form-select" value={formData.role} onChange={handleChange} name="role" required>
                                    <option value="">Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Product Manager">Product Manager</option>
                                    <option value="Supplier Manager">Supplier Manager</option>
                                    <option value="Inventory Manager">Inventory Manager</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">Type</label>
                                <input type="text" id="type" className="form-control" placeholder="Enter Employee Type"
                                    value={formData.type} onChange={handleChange} name="type" required />
                            </div>

                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="NIC" className="form-label">NIC</label>
                                <input type="text" id="NIC" className="form-control" placeholder="Enter Employee NIC"
                                    value={formData.NIC} onChange={handleChange} name="NIC" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select id="gender" className="form-select"
                                    value={formData.gender} onChange={handleChange} name="gender" required>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="DOB" className="form-label">Date of Birth</label>
                                <input type="date" id="DOB" className="form-control"
                                    value={formData.DOB} onChange={handleChange} name="DOB" max={getCurrentDate()} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="contactNo" className="form-label">Contact No</label>
                                <input type="text" id="contactNo" className="form-control" placeholder="Enter Employee Contact No"
                                    value={formData.contactNo} onChange={handleChange} name="contactNo" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" id="address" className="form-control" placeholder="Enter Employee Address"
                                    value={formData.address} onChange={handleChange} name="address" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="joinedDate" className="form-label">Joined Date</label>
                                <input type="date" id="joinedDate" className="form-control"
                                    value={formData.joinedDate} onChange={handleChange} name="joinedDate" max={getCurrentDate()} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="profilePhoto" className="form-label">Profile Photo</label>
                                <input type="file" id="profilePhoto" className="form-control" onChange={handleChange} name="profilePhoto" />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">REGISTER</button>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                </fieldset>
            </form>
        </div>
    );
}