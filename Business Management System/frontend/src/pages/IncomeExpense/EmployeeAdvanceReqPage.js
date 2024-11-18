import React from 'react'
import EmployeeAdvanceForm from '../../Components/FinancialComponents/EmployeeAdvanceForm'
import Navbar from '../../Components/FinancialComponents/Navbar';
import backgroundImage from '../../images/b2.png'

function testp() {
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
                        <a className="nav-link" href="/Financial/pp" style={{ color: 'black', border: '1px solid #ccc', borderBottom: 'none' }}>View Salary Details</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/Financial/tp" style={{ color: 'white', backgroundColor: 'black', border: '1px solid #ccc', borderBottom: 'none' }}>Request a salary advance</a>
                    </li>
                </ul>
            </div>

            <div>
                <EmployeeAdvanceForm />
            </div>
        </div>
    )
}

export default testp