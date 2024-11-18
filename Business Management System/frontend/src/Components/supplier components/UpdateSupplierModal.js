import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components
import Swal from 'sweetalert2';

const UpdateSupplierModal = ({ supplier, handleCloseModal, updateSuppliers }) => {
    const [supname, setSupname] = useState(supplier.supname);
    const [supMaterial, setMaterial] = useState(supplier.supMaterial);
    const [address, setAddress] = useState(supplier.address);
    const [email, setEmail] = useState(supplier.email);
    const [phone, setPhone] = useState(supplier.phone);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/api/supplier/update/${supplier._id}`, { supname, supMaterial, address, email, phone })
            .then(result => {
                console.log(result);
                updateSuppliers(); // Update the supplier list
                handleCloseModal(); // Close the modal
                Swal.fire({
                    icon: 'success',
                    title: 'Transaction successfully updated',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.log(error));
    };

    return (
        <Modal show={true} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Update Supplier</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="supname" className="form-label">Supplier Name</label>
                        <input type="text" className="form-control" id="supname" name="supname" value={supname} onChange={(e) => setSupname(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="supMaterial" className="form-label">Material Type</label>
                        <input type="text" className="form-control" id="supMaterial" name="supMaterial" value={supMaterial} onChange={(e) => setMaterial(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateSupplierModal;
