import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'

const SideNavbar = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div style={{position: 'fixed', top: '56px', left: '0', width: collapsed ? '50px' : '305px', height: '100%', backgroundColor: '#047304 ', color: '#fff', transition: 'width 0.3s ease', zIndex: '1000', overflowY: 'auto'}}>
            <div style={{display: 'flex', justifyContent: 'flex-end', padding: '10px'}}>
                <button style={{backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '20px'}} onClick={toggleSidebar}>
                    <i className="bi bi-justify"></i>
                </button>
            </div>
            {!collapsed && (
                <ul style={{listStyle: 'none', padding: '20px'}}>
                    <div>
                        <li style={{padding: '10px'}} onMouseEnter={e => { e.target.style.backgroundColor = '#4C4C4D'; }} onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; }}>
                            <i className="bi-clipboard-data"></i>
                            <a href="/dash" style={{textDecoration: 'none', color: '#fff', paddingLeft: '10px'}}>Dashboard</a>
                        </li>
                    </div>
                    <div>
                        <li style={{padding: '10px'}} onMouseEnter={e => { e.target.style.backgroundColor = '#4C4C4D'; }} onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; }}>
                            <i className="bi-currency-dollar"></i>
                            <a href="/" style={{textDecoration: 'none', color: '#fff', paddingLeft: '10px'}}>Income/Expense Management</a>
                        </li>
                    </div>
                    <div>
                        <li style={{padding: '10px'}} onMouseEnter={e => { e.target.style.backgroundColor = '#4C4C4D'; }} onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; }}>
                            <i className="bi-person-plus"></i>
                            <a href="/payroll" style={{textDecoration: 'none', color: '#fff', paddingLeft: '10px'}}>Employee Payroll</a>
                        </li>
                    </div>
                    <div>
                        <li style={{padding: '10px'}} onMouseEnter={e => { e.target.style.backgroundColor = '#4C4C4D'; }} onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; }}>
                            <i className="bi-graph-up"></i>
                            <a href="/place" style={{textDecoration: 'none', color: '#fff', paddingLeft: '10px'}}>Adjust Product Prices</a>
                        </li>
                    </div>
                    <div>
                        <li style={{padding: '10px'}} onMouseEnter={e => { e.target.style.backgroundColor = '#4C4C4D'; }} onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; }}>
                            <i className="bi-graph-up"></i>
                            <a href="/dummy" style={{textDecoration: 'none', color: '#fff', paddingLeft: '10px'}}>pl2</a>
                        </li>
                    </div>
                </ul>
            )}
        </div>
    );
};

export default SideNavbar;
