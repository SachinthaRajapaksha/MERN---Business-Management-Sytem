import React from 'react'
import EmployeeSalaryTable from '../../Components/FinancialComponents/EmployeeSalaryTable'
import Navbar from '../../Components/FinancialComponents/Navbar';
import Sidebar from '../../Components/FinancialComponents/Sidebar';
import backgroundImage from '../../images/b2.png'

function EmpSalPage() {
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

            <div>
                <Navbar />
                <Sidebar />
            </div>
            <div>
                <div style={{ marginTop: '100px', marginLeft: '80px' }}>
                    <div className=" d-flex shadow-sm container mb-4 mt-2 border rounded " style={{ width: '470px', background: '#fff', marginRight: '970px' }}>
                        <h2>Employee Salary Management</h2>
                    </div>
                    <hr style={{ width: '90%', borderColor: '#fff ', borderWidth: '5px' }} />
                </div>

                <div style={{ width: '1410px', marginLeft: '80px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <ul className="nav nav-tabs" style={{ backgroundColor: '#60c294', borderBottom: '1px solid #ccc', borderRadius: '5px 5px 0 0' }}>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/Financial/payroll" style={{ color: 'black', border: '1px solid #ccc', borderBottom: 'none' }}>Calculation</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/Financial/empsal" style={{ color: 'white', backgroundColor: 'black', border: '1px solid #ccc', borderBottom: 'none' }}>Employee Salary Data</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Financial/place" style={{ color: 'black', border: '1px solid #ccc', borderBottom: 'none' }}>Advance Requests</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <EmployeeSalaryTable />
            </div>
            <footer style={{ backgroundColor: "#333", color: "#fff", padding: "50px", textAlign: "center", marginTop: '50px' }}>
                <span style={{ left: '10px' }}>SunRich Paradise All rights Reserved</span>
            </footer>

        </div>
    )
}

export default EmpSalPage