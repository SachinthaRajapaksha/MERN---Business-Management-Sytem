import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePayrollModal = ({ handleCloseModal, payrollId, updateGenPayrolls }) => {
    const [payrollData, setPayrollData] = useState({
        employeeType: '',
        grossSalary: 0,
        additionalBonuses: [],
        generalDeductions: [],
        month: ''
    });

    useEffect(() => {
        fetchPayrollData();
    }, [payrollId]);

    const fetchPayrollData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/incomes/allpayrolls/${payrollId}`);
            setPayrollData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setPayrollData({
            ...payrollData,
            [e.target.name]: e.target.value
        });
    };

    const handleArrayChange = (index, e, arrayName) => {
        const newArray = [...payrollData[arrayName]];
        newArray[index][e.target.name] = e.target.value;
        setPayrollData({
            ...payrollData,
            [arrayName]: newArray
        });
    };

    const handleAddField = (arrayName) => {
        setPayrollData({
            ...payrollData,
            [arrayName]: [...payrollData[arrayName], { detail: '', amount: '' }]
        });
    };

    const handleSave = async () => {
        // Filter out empty fields from additionalBonuses
        const additionalBonuses = payrollData.additionalBonuses.filter(bonus => bonus.detail.trim() !== '' || bonus.amount !== '');
        // Filter out empty fields from generalDeductions
        const generalDeductions = payrollData.generalDeductions.filter(deduction => deduction.detail.trim() !== '' || deduction.amount !== '');

        try {
            await axios.put(`http://localhost:4000/api/incomes/updatepayroll/${payrollId}`, {
                ...payrollData,
                additionalBonuses,
                generalDeductions
            });
            updateGenPayrolls();
            handleCloseModal();
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} >
            <div className="card p-4" style={{ marginLeft: '40px', marginRight: '20px', marginTop: '55px' }} >
                <h2 className="text-center mb-4">Update employee payroll information</h2>
                <div className="d-flex">
                    <div className="mb-3" style={{ marginRight: '5px', flex: '1' }}>
                        <label className="form-label">Employee Designation:</label>
                        <input className="form-control" type="text" name="employeeType" placeholder="type" value={payrollData.employeeType} onChange={handleChange} style={{ width: '100%' }} />
                    </div>
                    <div className="mb-3" style={{ marginLeft: '5px', flex: '1' }}>
                        <label className="form-label">Gross Salary:</label>
                        <input className="form-control" type="number" name="grossSalary" placeholder="Amount" value={payrollData.grossSalary} onChange={handleChange} style={{ width: '100%' }} />
                    </div>
                </div>
                <div>
                    <label className="form-label">Additional Bonuses:</label>
                    {payrollData.additionalBonuses.map((bonus, index) => (
                        <div className="d-flex" key={index}>
                            <input className="form-control me-2 mb-2" type="text" name="detail" placeholder="Detail" value={bonus.detail} onChange={(e) => handleArrayChange(index, e, 'additionalBonuses')} />
                            <input className="form-control mb-2" type="number" name="amount" placeholder="Amount" value={bonus.amount} onChange={(e) => handleArrayChange(index, e, 'additionalBonuses')} />
                        </div>
                    ))}
                    <button className="btn btn-primary float-end" onClick={() => handleAddField('additionalBonuses')}>
                        <i className="bi bi-plus"></i> Add more bonuses
                    </button>
                </div>
                <div>
                    <label className="form-label">General Deductions:</label>
                    {payrollData.generalDeductions.map((deduction, index) => (
                        <div className="d-flex" key={index}>
                            <input className="form-control me-2 mb-2" type="text" name="detail" placeholder="Detail" value={deduction.detail} onChange={(e) => handleArrayChange(index, e, 'generalDeductions')} />
                            <input className="form-control mb-2" type="number" name="amount" placeholder="Amount" value={deduction.amount} onChange={(e) => handleArrayChange(index, e, 'generalDeductions')} />
                        </div>
                    ))}
                    <button className="btn btn-primary float-end" onClick={() => handleAddField('generalDeductions')}>
                        <i className="bi bi-plus"></i> Add more deductions
                    </button>
                </div>
                <div className="mb-3">
                    <label className="form-label">Month:</label>
                    <input className="form-control" type="text" name="month" placeholder="Select Month" value={payrollData.month} onChange={handleChange} />
                </div>
                <button className="btn btn-success" style={{ marginBottom: '5px' }} onClick={handleSave}>
                    <i className="bi bi-save"></i> Save
                </button>
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                    <i className="bi bi-x-square"></i> Cancel
                </button>
            </div>
        </div>
    );
};

export default UpdatePayrollModal;
