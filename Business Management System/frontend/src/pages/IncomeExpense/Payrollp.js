import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../../images/b2.png'
import Navbar from '../../Components/FinancialComponents/Navbar';

const SalaryDetails = () => {
    const [empId, setEmpId] = useState('');
    const [salaryDetails, setSalaryDetails] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setEmpId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:4000/api/incomes/calculatedsalary/${empId}`);
            setSalaryDetails(response.data);
            setError('');
        } catch (error) {
            setError('Employee not found or server error');
            setSalaryDetails(null);
        }
    };

    return (
        <div>

            <div style={{
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

            <div style={{ width: '1410px', marginLeft: '80px', marginTop:'80px' , border: '1px solid #ccc', borderRadius: '5px' }}>
                <ul className="nav nav-tabs" style={{ backgroundColor: '#60c294', borderBottom: '1px solid #ccc', borderRadius: '5px 5px 0 0' }}>
                    
                    <li className="nav-item">
                        <a className="nav-link active" href="/Financial/pp" style={{ color: 'white', backgroundColor: 'black', border: '1px solid #ccc', borderBottom: 'none' }}>View Salary Details</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Financial/tp" style={{ color: 'black', border: '1px solid #ccc', borderBottom: 'none' }}>Request a salary advance</a>
                    </li>
                </ul>
            </div>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Enter your employee id to view your salary details</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="employeeId" className="form-label">Employee ID:</label>
                                        <input type="text" id="employeeId" className="form-control" value={empId} onChange={handleChange} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Get Salary Details</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {error && <p>{error}</p>}
            {salaryDetails && (
                <div className="container" style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '20px', marginTop: '20px' }} >
                    <div className="modal-content">
                        <div className="modal-header" style={{ marginBottom: '20px' }}>
                            <p className="modal-title">Your salary detail for {salaryDetails.month}</p>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-6 mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text"><strong>Employee ID: </strong>{salaryDetails.empId}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text"><strong>Username: </strong>{salaryDetails.username}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text"><strong>Designation: </strong>{salaryDetails.employeeType}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text"><strong>Month: </strong>{salaryDetails.month}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text"><strong>Basic Salary: </strong>{salaryDetails.basicSalary}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {salaryDetails.additionalBonuses.length > 0 && (
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="additional-bonuses border p-3 rounded mb-3 mt-3">
                                                <p><strong>Additions:</strong></p>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Details</th>
                                                            <th scope="col" style={{ width: '20%' }}>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {salaryDetails.additionalBonuses.map((bonus, index) => (
                                                            <tr key={index}>
                                                                <td>{bonus.detail}</td>
                                                                <td>{bonus.amount}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {salaryDetails.generalDeductions.length > 0 && (
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="general-deductions border p-3 rounded mb-3">
                                                <p><strong>Deductions:</strong></p>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Details</th>
                                                            <th scope="col" style={{ width: '20%' }}>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {salaryDetails.generalDeductions.map((deduction, index) => (
                                                            <tr key={index}>
                                                                <td>{deduction.detail}</td>
                                                                <td>{deduction.amount}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <hr />
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <div className="net-salary border p-3 rounded mb-3">
                                            <p><strong>Net Salary:</strong> {salaryDetails.baseSalary}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalaryDetails;
