import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/employees/login', { email, password });
            const { token, redirectTo, role, userId } = response.data; // Assuming 'userId' is passed back

            localStorage.setItem('token', token); // Store the token in localStorage

            // Dynamic redirection based on role
            if (role === 'Employee') {
                navigate(`/employee-profile/${userId}`); // Redirect to the employee's profile page using their ID
            } else {
                navigate(redirectTo); // Use redirectTo for other roles as received from the server
            }
        } catch (error) {
            setError('Invalid email or password');
            console.error(error);
        }
    };


    return (
        <div style={{ backgroundColor: '#dcfce7' }}>
            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-black">
                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                <form onSubmit={handleSubmit} style={{ width: '23rem' }}>
                                    <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

                                    <div className="form-outline mb-4" data-mdb-input-init>
                                        <input type="email" id="form2Example18" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                                        <label className="form-label" htmlFor="form2Example18">Email address</label>
                                    </div>

                                    <div className="form-outline mb-4" data-mdb-input-init>
                                        <input type="password" id="form2Example28" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                                        <label className="form-label" htmlFor="form2Example28">Password</label>
                                    </div>

                                    <div className="pt-1 mb-4">
                                        <button className="btn btn-info btn-lg btn-block" data-mdb-button-init data-mdb-ripple-init type="submit">Login</button>
                                    </div>
                                    {error && <p>{error}</p>}
                                    <p className="small mb-5 pb-lg-2"><a href="#!" className="text-muted">Forgot password?</a></p>


                                </form>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-6 col-xl-6 d-flex justify-content-end ">
                        <img src="https://i.postimg.cc/V6S4C75z/hero-image.png" className="img-fluid" alt="Sample image" style={{ maxWidth: '100%', maxHeight: '90vh' }} />
                    </div>


                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoginForm

