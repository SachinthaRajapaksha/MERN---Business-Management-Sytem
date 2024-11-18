import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function AddSupplierModal({ handleCloseModal, updateSuppliers }) {
  const [formData, setFormData] = useState({
    supname: '',
    supMaterial: '',
    address: '',
    email: '',
    phone: ''
  });

  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'phone') {
      if (value.length > 10) {
        setPhoneError('Phone number cannot exceed 10 characters');
      } else {
        setPhoneError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:4000/api/supplier/add", formData)
      .then(result => {
        console.log(result);
        updateSuppliers();
        handleCloseModal();
        Swal.fire({
          icon: 'success',
          title: 'Supplier Details Successfully Added',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => console.log(error));
  };

  return (
    <div
      className="modal fade show"
      id="addSupplierModal"
      tabIndex="-1"
      aria-labelledby="addSupplierModalLabel"
      aria-hidden="false"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addSupplierModalLabel">
              Add Supplier
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="supname" className="form-label">
                  Supplier Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="supname"
                  name="supname"
                  value={formData.supname}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="supMaterial" className="form-label">
                  Materials Supplied:
                </label>
                <select
                  className="form-select"
                  id="supMaterial"
                  name="supMaterial"
                  value={formData.supMaterial}
                  onChange={handleChange}
                >
                  <option value="">Select Material</option>
                  <option value="Coconut">Coconut</option>
                  <option value="Fish">Fish</option>
                  <option value="Spices">Spices</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone:
                </label>
                <input
                  type="text"
                  className={`form-control ${phoneError && 'is-invalid'}`}
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {phoneError && <div className="invalid-feedback">{phoneError}</div>}
              </div>
              <button type="submit" className="btn btn-primary">
                Add Supplier
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                data-bs-dismiss="modal"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSupplierModal;
