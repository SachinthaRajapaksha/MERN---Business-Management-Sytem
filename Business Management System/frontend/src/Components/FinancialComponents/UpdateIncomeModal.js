import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function UpdateIncomeModal({ income, handleCloseModal, updateIncomes }) {
    const [detail, setDetail] = useState(income.detail);
    const [category, setCategory] = useState(income.category);
    const [amount, setAmount] = useState(income.amount);
    const [type, setType] = useState(income.type);
    const [amountError, setAmountError] = useState('');

    const handleAmountChange = (e) => {
        const inputAmount = e.target.value;
        setAmount(inputAmount);

        if (inputAmount.length > 10) {
            setAmountError('Invalid amount value. Please check again');
        } else {
            setAmountError('');
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:4000/api/incomes/trans/${income._id}`, { detail, category, amount, type })
            .then(result => {
                console.log(result);
                updateIncomes();
                handleCloseModal();
                Swal.fire({
                    icon: 'success',
                    title: 'Transaction successfully updated',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.log(error));
    }
    

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl " role="document" style={{marginTop:'150px'}} >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Transaction</h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleUpdate}>
                            <div className='mb-2'>
                                <label htmlFor="">Detail</label>
                                <input type="text" placeholder='Detail' className='form-control'
                                    value={detail} onChange={(e) => setDetail(e.target.value)} />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="">Category</label>
                                <select className='form-control' onChange={(e) => setCategory(e.target.value)}>
                                    <option selected disabled>Select category <i className="bi bi-caret-down-square"></i></option>
                                    <optgroup label="---Income Categories---">
                                        <option value="Sales Revenue">Sales Revenue</option>
                                        <option value="Dividend Income">Dividend Income</option>
                                        <option value="Commissions">Commissions</option>
                                        <option value="Other Incomes">Other Incomes</option>
                                        <option value="Customer Order">Customer Order</option>   
                                    </optgroup>
                                    <optgroup label="---Expense Categories---">
                                        <option value="Utilities and Maintenance">Utilities and Maintenance</option>
                                        <option value="Supplier payments">Supplier payments</option>
                                        <option value="Operating Expenses">Operating Expenses</option>
                                        <option value="Other Expenses">Other Expenses</option>
                                    </optgroup>
                                </select>
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="">Amount</label>
                                <input type="number" placeholder='Amount' className='form-control'
                                    value={amount} onChange={handleAmountChange} />
                                {amountError && <small className="text-danger">{amountError}</small>}
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="">Type</label>
                                <div>
                                    <input type="radio" id="income" name="type" value="Income"
                                        checked={type === "Income"} onChange={() => setType("Income")} />
                                    <label htmlFor="income" style={{ marginLeft: '5px', marginRight: '15px' }}>Income</label>
                                    <input type="radio" id="expense" name="type" value="Expense"
                                        checked={type === "Expense"} onChange={() => setType("Expense")} />
                                    <label htmlFor="expense" style={{ marginLeft: '5px' }}>Expense</label>
                                </div>
                            </div>
                            <button type="submit" className='btn btn-success'>Update</button>
                            <span style={{ marginRight: '10px' }}></span>
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateIncomeModal;
