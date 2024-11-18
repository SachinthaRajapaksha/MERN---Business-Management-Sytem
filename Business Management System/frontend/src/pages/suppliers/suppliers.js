import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddSupplierModal from '../../Components/supplier components/addSupplierModal';
import Navbar from '../../Components/supplier components/Navbar';
import Sidebar from '../../Components/supplier components/Sidebar';
import UpdateSupplierModal from '../../Components/supplier components/UpdateSupplierModal';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);


    useEffect(() => {
        axios.get("http://localhost:4000/api/supplier/all")
            .then(result => setSuppliers(result.data))
            .catch(error => console.log(error))
    }, []);

    const handleUpdate = (supplier) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to update the Supplier details?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                setSelectedSupplier(supplier);
                setShowUpdateModal(true);
            }
        });
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                // If user confirms deletion
                await axios.delete(`http://localhost:4000/api/supplier/delete/${id}`);
                // Update state by removing the deleted supplier from the suppliers array
                setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier._id !== id));
                // Show a success message
                console.log('Supplier deleted successfully');
                Swal.fire(
                    'Deleted!',
                    'Your supplier has been deleted.',
                    'success'
                );
            }
        } catch (error) {
            // If there's an error during deletion
            console.log(error);
            Swal.fire(
                'Error!',
                'An error occurred while deleting the supplier.',
                'error'
            );
        }
    };


    const handleShowAddModal = () => {
        Swal.fire({
            title: 'Do you want to add a new supplier?',
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

    const handleCloseModal = () => {
        setShowUpdateModal(false);
        setSelectedSupplier(null);

    }

    const updateSuppliers = () => {
        axios.get("http://localhost:4000/api/supplier/all")
            .then(result => setSuppliers(result.data))
            .catch(error => console.log(error))
    }

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.supId.includes(searchTerm) || supplier.supname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePDFGeneration = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/supplier/generate-pdf', {
            responseType: 'blob' // Important to handle binary data
          });
    
          // Create a Blob object representing the data.
          const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    
          // Create a link element, hide it, direct it towards the blob, and then 'click' it programatically to trigger the download.
          const url = window.URL.createObjectURL(pdfBlob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
    
          // The filename that the PDF will be downloaded as.
          a.download = 'supplier_report.pdf';
          document.body.appendChild(a);
          a.click();
    
          // Cleanup
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } catch (error) {
          // Handle error
          console.error('Error generating PDF:', error);
        }
      };

    return (
        <div style={{ background: '#dbf8e3', minHeight: '100vh' }} >
            <Navbar />
            <Sidebar />
            <div>
                <div className="main-content-container" style={{ marginTop: '50px', marginBottom: '30px', paddingTop: '40px' }}>
                    <div className="d-flex" style={{ display: 'flex', justifyContent: 'center' }}>
                        <form className="d-flex me-4">
                            <input
                                type="text"
                                placeholder="Search by ID or Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-control mb-3"
                                style={{ width: '440px' }}
                            />
                        </form>
                        <button className='btn btn-secondary' onClick={handleShowAddModal} style={{ marginLeft: '100px', paddingTop: '5px' }}>Add Suppliers+</button>
                        <button className='btn btn-secondary' onClick={handlePDFGeneration} style={{ marginLeft: '10px', paddingTop: '5px' }}>Generate Report</button>
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: '75px', maxWidth: '1450px' }} >
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Registerd Date</th>
                            <th>Supplier ID</th>
                            <th>Supplier Name</th>
                            <th>Material Type</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSuppliers.map(supplier => (
                            <tr key={supplier._id}>
                                <td>{new Date(supplier.date).toLocaleDateString()}</td>
                                <td>{supplier.supId}</td>
                                <td>{supplier.supname}</td>
                                <td>{supplier.supMaterial}</td>
                                <td>{supplier.address}</td>
                                <td>{supplier.email}</td>
                                <td>{supplier.phone}</td>
                                <td>
                                    <button className="btn btn-primary me-2" onClick={() => handleUpdate(supplier)}><i className="bi bi-pencil-square"></i></button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(supplier._id)}><i class="bi bi-trash3-fill"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* display show add modal */}
            {showAddModal && (
                <AddSupplierModal
                    handleCloseModal={handleCloseAddModal}
                    updateSuppliers={updateSuppliers}
                />
            )}

            {/* display show income modal */}
            {showUpdateModal && (
                <UpdateSupplierModal
                    supplier={selectedSupplier}
                    handleCloseModal={handleCloseModal}
                    updateSuppliers={updateSuppliers}
                />
            )}

        </div>
    );
};

export default SupplierList;
