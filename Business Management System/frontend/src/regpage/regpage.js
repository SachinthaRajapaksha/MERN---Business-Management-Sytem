import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import regImage from '../img/regimage.jpg';

export default function RegPage() {
    const [formData, setFormData] = useState({
        username: '',
        emailPart: '',
        password: '',
        confirmPassword: '',
        name: '',
        age: '',
        gender: '',
        address: '',
        contactNumber: ''
    });
    const [passwordError, setPasswordError] = useState(false); 

    function handleChange(event) {
        const { name, value } = event.target;

        if (name === 'age' || name === 'contactNumber') {
            const numericValue = value.replace(/\D/g, ''); 
            setFormData(prevState => ({
                ...prevState,
                [name]: numericValue
            }));
        } else if (name === 'emailPart') {
            const emailValue = value.includes('@') ? value.replace('@', '') : value;
            setFormData(prevState => ({
                ...prevState,
                emailPart: emailValue
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

        // Reset password error when either password or confirm password changes
        if (name === 'password' || name === 'confirmPassword') {
            setPasswordError(false);
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordError(true);
            return;
        }
        const email = `${formData.emailPart}@gmail.com`;
        try {
            const response = await fetch('http://localhost:4000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, email })
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                toast.success('Registration successful!', { position: "top-center" });
                // Delay page reload after 2 seconds
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                if (response.status === 400 && data.message === 'Email is already associated with an account') {
                    toast.error('This email is already associated with an account.', { position: "top-center" });
                } else {
                    toast.error('Registration failed. Please try again.', { position: "top-center" });
                }
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred. Please try again later.', { position: "top-center" });
        }
    };
    

    return (
        <div style={{ 
            backgroundImage: `url(${regImage})`, 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center', 
            minHeight: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '20px' // Add some padding for better visibility
        }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px', width: '500px' }}>
                <h3 className='text-center text-white mb-4'>Create Account</h3>
                <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label text-white">Username</label>
                        <input type="text" className="form-control" id="username" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label text-white">Name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label text-white">Age</label>
                        <input type="number" className="form-control" id="age" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">Gender</label>
                        <div className="d-flex">
                            <div className="form-check me-3">
                                <input className="form-check-input" type="radio" id="male" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} />
                                <label className="form-check-label text-white" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="female" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} />
                                <label className="form-check-label text-white" htmlFor="female">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label text-white">Address</label>
                        <textarea className="form-control" id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label text-white">Contact Number</label>
                        <input type="text" maxLength={10} className="form-control" id="contactNumber" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-white">Email</label>
                        <div className="input-group">
                            <input type="text" className="form-control" id="emailPart" name="emailPart" placeholder="Email" value={formData.emailPart} onChange={handleChange} />
                            <span className="input-group-text text-black">@gmail.com</span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-white">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label text-white">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                        {passwordError && <small className="text-danger">Passwords do not match.</small>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#00563B', border: '2px solid #00563B' }}>Register</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
