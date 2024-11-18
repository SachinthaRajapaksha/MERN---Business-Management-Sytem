import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateSalaryModal = ({ handleCloseModal, selectedUsers, handleSaveUpdate }) => {
    const [additionalBonuses, setAdditionalBonuses] = useState([{ detail: '', amount: '' }]);
    const [generalDeductions, setGeneralDeductions] = useState([{ detail: '', amount: '' }]);

    const handleAddBonus = () => {
        setAdditionalBonuses([...additionalBonuses, { detail: '', amount: '' }]);
    };

    const handleAddDeduction = () => {
        setGeneralDeductions([...generalDeductions, { detail: '', amount: '' }]);
    };

    const handleSave = async () => {
        try {
            // Filter out empty fields from additionalBonuses
            const filteredBonuses = additionalBonuses.filter(bonus => bonus.detail.trim() !== '' || bonus.amount !== '');

            // Filter out empty fields from generalDeductions
            const filteredDeductions = generalDeductions.filter(deduction => deduction.detail.trim() !== '' || deduction.amount !== '');

            // Prepare data for saving
            const data = {
                empIds: selectedUsers,
                additionalBonuses: filteredBonuses,
                generalDeductions: filteredDeductions
            };

            // Send data to the server
            const response = await axios.put('http://localhost:4000/api/incomes/updatecalculatedsalaries', data);
            console.log('Saved salaries response:', response.data);

            handleSaveUpdate();

            // Close the modal
            handleCloseModal();
        } catch (error) {
            console.error('Error saving calculated salaries:', error);
            // Handle error message (optional)
        }
    };

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="card p-4" style={{ marginLeft: '40px', marginRight: '20px', marginTop: '55px' }}>
                <h2 className="text-center mb-4">Update employee salary information</h2>
                <div>
                    <div >
                        <div className="mb-3" style={{ marginRight: '5px', flex: '1' }}>
                            <label className="form-label">Additional Bonuses:</label>
                            {additionalBonuses.map((bonus, index) => (
                                <div className="d-flex" key={index}>
                                    <input
                                        className="form-control me-2 mb-2"
                                        type="text"
                                        name="detail"
                                        placeholder="Bonus Detail"
                                        value={bonus.detail}
                                        onChange={(e) => {
                                            const updatedBonuses = [...additionalBonuses];
                                            updatedBonuses[index].detail = e.target.value;
                                            setAdditionalBonuses(updatedBonuses);
                                        }}
                                    />
                                    <input
                                        className="form-control mb-2"
                                        type="number"
                                        name="amount"
                                        placeholder="Bonus Amount"
                                        value={bonus.amount}
                                        onChange={(e) => {
                                            const updatedBonuses = [...additionalBonuses];
                                            updatedBonuses[index].amount = parseInt(e.target.value);
                                            setAdditionalBonuses(updatedBonuses);
                                        }}
                                    />
                                </div>
                            ))}
                            <button className="btn btn-primary float-end" onClick={handleAddBonus}>
                                <i className="bi bi-plus"></i> Add Bonus
                            </button>
                        </div>
                        <div className="mb-3" style={{ marginLeft: '5px', flex: '1' }}>
                            <label className="form-label">General Deductions:</label>
                            {generalDeductions.map((deduction, index) => (
                                <div className="d-flex" key={index}>
                                    <input
                                        className="form-control me-2 mb-2"
                                        type="text"
                                        name="detail"
                                        placeholder="Deduction Detail"
                                        value={deduction.detail}
                                        onChange={(e) => {
                                            const updatedDeductions = [...generalDeductions];
                                            updatedDeductions[index].detail = e.target.value;
                                            setGeneralDeductions(updatedDeductions);
                                        }}
                                    />
                                    <input
                                        className="form-control mb-2"
                                        type="number"
                                        name="amount"
                                        placeholder="Deduction Amount"
                                        value={deduction.amount}
                                        onChange={(e) => {
                                            const updatedDeductions = [...generalDeductions];
                                            updatedDeductions[index].amount = parseInt(e.target.value);
                                            setGeneralDeductions(updatedDeductions);
                                        }}
                                    />
                                </div>
                            ))}
                            <button className="btn btn-primary float-end" style={{ marginBottom: '20px'}} onClick={handleAddDeduction}>
                                <i className="bi bi-plus"></i> Add Deduction
                            </button>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={handleSave}>
                        Save
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateSalaryModal;