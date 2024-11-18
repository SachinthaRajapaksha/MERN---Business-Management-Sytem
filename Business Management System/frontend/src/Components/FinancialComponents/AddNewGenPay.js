import React, { useState } from 'react';
import axios from 'axios';

const Emppayroll = ({ handleCloseModal }) => {
    const [payrollData, setPayrollData] = useState({
        employeeType: '',
        grossSalary: '',
        additionalBonuses: [{ amount: '', detail: '' }],
        generalDeductions: [{ amount: '', detail: '' }],
        month: ''
    });
    const [errors, setErrors] = useState({
        employeeType: '',
        grossSalary: '',
        month: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayrollData({ ...payrollData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleArrayChange = (index, e, field) => {
        const updatedArray = [...payrollData[field]];
        updatedArray[index][e.target.name] = e.target.value;
        setPayrollData({ ...payrollData, [field]: updatedArray });
    };

    const handleAddField = (field) => {
        setPayrollData({ ...payrollData, [field]: [...payrollData[field], { amount: '', detail: '' }] });
    };

    const handleSave = async () => {
        const { employeeType, grossSalary, month } = payrollData;
        const errorsCopy = { ...errors };
        let hasError = false;

        if (employeeType.trim() === '') {
            errorsCopy.employeeType = 'Please enter employee designation';
            hasError = true;
        }

        if (grossSalary.trim() === '') {
            errorsCopy.grossSalary = 'Please enter gross salary';
            hasError = true;
        }

        if (month.trim() === '') {
            errorsCopy.month = 'Please select a month';
            hasError = true;
        } else if (!isValidMonth(month)) {
            errorsCopy.month = 'Invalid month format. Please enter a valid month';
            hasError = true;
        }

        setErrors(errorsCopy);

        if (hasError) return;

        try {
            await axios.post('http://localhost:4000/api/incomes/addpayroll', payrollData);
            alert('Payroll details saved successfully');
            handleCloseModal();
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const isValidMonth = (month) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months.includes(month.trim());
    };

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} >
            <div className="card p-4" style={{ marginLeft: '40px', marginRight: '20px', marginTop: '58px' }} >
                <h2 className="text-center mb-4">Add employee payroll information</h2>
                <div className="d-flex">
                    <div className="mb-3" style={{ marginRight: '5px', flex: '1' }}>
                        <label className="form-label">Employee Designation:</label>
                        <input className="form-control" type="text" name="employeeType" placeholder="type" value={payrollData.employeeType} onChange={handleChange} style={{ width: '100%' }} />
                        {errors.employeeType && <small className="text-danger">{errors.employeeType}</small>}
                    </div>
                    <div className="mb-3" style={{ marginLeft: '5px', flex: '1' }}>
                        <label className="form-label">Gross Salary:</label>
                        <input className="form-control" type="number" name="grossSalary" placeholder="Amount" value={payrollData.grossSalary} onChange={handleChange} style={{ width: '100%' }} />
                        {errors.grossSalary && <small className="text-danger">{errors.grossSalary}</small>}
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
                    <button className="btn btn-primary float-end" style={{ marginBottom: '20px' }} onClick={() => handleAddField('generalDeductions')}>
                        <i className="bi bi-plus"></i> Add more deductions
                    </button>
                </div>
                <div className="mb-3">
                    <label className="form-label">Month:</label>
                    <input className="form-control" type="text" name="month" placeholder="select month" value={payrollData.month} onChange={handleChange} />
                    {errors.month && <small className="text-danger">{errors.month}</small>}
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

export default Emppayroll;
