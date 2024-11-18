import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/FinancialComponents/Navbar';
import Sidebar from '../../Components/FinancialComponents/Sidebar'
import axios from 'axios';
import Swal from 'sweetalert2';
import UpdateIncomeModal from '../../Components/FinancialComponents/UpdateIncomeModal';
import AddTransactionModal from '../../Components/FinancialComponents/AddTransactionModal';
import DropdownMethod from '../../Components/FinancialComponents/DropdownMethod';
import backgroundImage from '../../images/b2.png'

function Trans() {
    const [incomes, setIncomes] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');

    useEffect(() => {
        axios.get("http://localhost:4000/api/incomes/trans")
            .then(result => setIncomes(result.data))
            .catch(error => console.log(error))
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this transaction?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("http://localhost:4000/api/incomes/trans/" + id)
                    .then(res => {
                        setIncomes(prevIncomes => prevIncomes.filter(income => income._id !== id));
                        Swal.fire(
                            'Deleted!',
                            'Your transaction has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.log(error);
                        Swal.fire(
                            'Error!',
                            'An error occurred while deleting the transaction.',
                            'error'
                        );
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your transaction is safe :)',
                    'info'
                );
            }
        });
    }

    const handleUpdateClick = (income) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to update the transaction details?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                setSelectedIncome(income);
                setShowUpdateModal(true);
            }
        });
    }


    const handleCloseModal = () => {
        setShowUpdateModal(false);
        setSelectedIncome(null);

    }

    const updateIncomes = () => {
        axios.get("http://localhost:4000/api/incomes/trans")
            .then(result => setIncomes(result.data))
            .catch(error => console.log(error))
    }

    const handleShowAddModal = () => {
        Swal.fire({
            title: 'Do you want to add a new transaction?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                setShowAddModal(true);
            }
        });
    }

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    }

    const filteredIncomes = incomes.filter(income => {
        const query = searchQuery.toLowerCase();
        return (
            income.detail.toLowerCase().includes(query) ||
            income.date.includes(query)
        );
    });

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

            <Navbar />
            <Sidebar />
            <div className="main-content-container" style={{ marginTop: '50px', marginBottom: '30px', paddingTop: '40px' }}>
                <div className=" d-flex shadow-sm container mb-4 mt-2 border rounded " style={{ width: '510px', background: '#fff', marginRight: '870px' }}>
                    <h2>Income & Expenses Management</h2>
                </div>
                <hr style={{ width: '86%', borderColor: '#000000 ', borderWidth: '3px',marginLeft: '140px', marginBottom:'40px' }} />
                <div className="d-flex" style={{ display: 'flex', justifyContent: 'center' }}>
                    <span className="mx-3" style={{ marginLeft: '40px' }}></span>
                    <DropdownMethod
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                    />
                    <span className="mx-4"></span>
                    <form className="shadow-sm d-flex me-4">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search Transaction by detail or date"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '440px' }}
                        />
                    </form>
                    <button className='btn btn-success' onClick={handleShowAddModal} style={{ marginLeft: '100px' }}>Add Transaction +</button>
                </div>
            </div>

            <div class="shadow-lg container border rounded p-4" style={{ background: '#fff', marginBottom: '40px', marginLeft: '140px' }}>
                <div class="row">
                    <div class="col">
                        <table class="table table-striped border rounded " style={{ borderRadius: '50px', width: '1270px' }}>
                            <thead class="table-dark">
                                <tr>
                                    <th>Transaction Date</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredIncomes.map((income, index) => (
                                    <tr key={index}>
                                        <td>{new Date(income.date).toISOString().split('T')[0]}</td>
                                        <td style={{ maxWidth: '430px', wordWrap: 'break-word' }} >{income.detail}</td>
                                        <td>{income.category}</td>
                                        <td>{income.amount}</td>
                                        <td>{income.type}</td>
                                        <td style={{ maxWidth: '180px' }} >
                                            <div class="btn-group" role="group">
                                                <button type="button" class="btn btn-primary" onClick={() => handleUpdateClick(income)}><i class="bi bi-pencil"></i> Update</button>
                                                <button type="button" class="btn btn-danger" onClick={() => handleDelete(income._id)}><i class="bi bi-trash3"></i> Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <footer style={{ backgroundColor: "#333", color: "#fff", padding: "50px", textAlign: "center" }}>
                <span style={{ left: '10px' }}>SunRich Paradise All rights Reserved</span>
            </footer>


            {/* display show add modal */}
            {showAddModal && (
                <AddTransactionModal
                    handleCloseModal={handleCloseAddModal}
                    updateIncomes={updateIncomes}
                />
            )}
            {/* display show income modal */}
            {showUpdateModal && (
                <UpdateIncomeModal
                    income={selectedIncome}
                    handleCloseModal={handleCloseModal}
                    updateIncomes={updateIncomes}
                />
            )}

        </div>
    );
}

export default Trans;
