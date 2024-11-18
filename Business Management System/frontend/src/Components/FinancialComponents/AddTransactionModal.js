import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function AddTransactionModal({ handleCloseModal, updateIncomes }) {
    const [detail, setDetail] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('Income');
    const [amountError, setAmountError] = useState('');
    const [detailError, setDetailError] = useState('');
    const [categoryError, setCategoryError] = useState('');

    const handleAmountChange = (e) => {
        const inputAmount = e.target.value;
        setAmount(inputAmount);

        if (inputAmount.length > 10) {
            setAmountError('Invalid amount value. Please check again');
        } else {
            setAmountError('');
        }
    };

    const handleDetailChange = (e) => {
        const inputDetail = e.target.value;
        setDetail(inputDetail);

        if (inputDetail.trim() !== '') {
            setDetailError('');
        }
    };

    const handleCategoryChange = (e) => {
        const inputCategory = e.target.value;
        setCategory(inputCategory);

        if (inputCategory.trim() !== '') {
            setCategoryError('');
        }
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    if (detail.trim() === '') {
        setDetailError('Please enter a detail');
        return;
    }

    if (category.trim() === '') {
        setCategoryError('Please select a category');
        return;
    }

    if (amount.trim() === '') {
        setAmountError('Please enter an amount');
        return;
    }

    if (amount.trim().length > 10) {
        setAmountError('Invalid amount value. Please check again');
        return;
    }

    axios.post("http://localhost:4000/api/incomes/trans/", { detail, category, amount, type })
        .then(result => {
            console.log(result);
            updateIncomes();
            handleCloseModal();
            Swal.fire({
                icon: 'success',
                title: 'Transaction Details Successfully Added',
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch(error => console.log(error));
};


    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl" role="document" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Transaction</h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className='mb-2'>
                                <label htmlFor="">Description</label>
                                <input type="text" placeholder='Detail' className='form-control'
                                    value={detail} onChange={handleDetailChange} />
                                {detailError && <small className="text-danger">{detailError}</small>}
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="">Category</label>
                                <select className='form-control' onChange={handleCategoryChange}>
                                    <option disabled>Select category</option>
                                    <optgroup label="---Income Categories---">
                                        <option value="Sales Revenue">Sales Revenue</option>
                                        <option value="Dividend Income">Dividend Income</option>
                                        <option value="Commissions">Commissions</option>
                                        <option value="Other Incomes">Other Incomes</option>
                                    </optgroup>
                                    <optgroup label="---Expense Categories---">
                                        <option value="Utilities and Maintenance">Utilities and Maintenance</option>
                                        <option value="Supplier payments">Supplier payments</option>
                                        <option value="Operating Expenses">Operating Expenses</option>
                                        <option value="Other Expenses">Other Expenses</option>
                                        <option value="Employee Payrolls">Employee Payrolls</option>
                                    </optgroup>
                                </select>
                                {categoryError && <small className="text-danger">{categoryError}</small>}
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
                            <button type="submit" className='btn btn-success'>Submit</button>
                            <span style={{ marginRight: '10px' }}></span>
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTransactionModal;
