import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const EmployeeSalaryAdvanceForm = () => {
  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    amount: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/incomes/addsalaryadvancerequest', formData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Salary advance request submitted successfully',
      });
      // Clear form fields after submission
      setFormData({
        empId: '',
        name: '',
        amount: '',
        description: ''
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to submit salary advance request',
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="card-title mb-4">Submit Salary Advance Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Employee ID:</label>
            <input type="text" className="form-control" name="empId" value={formData.empId} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Amount:</label>
            <input type="number" className="form-control" name="amount" value={formData.amount} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit Request</button>
        </form>
      </div>
    </div>
  );

};

export default EmployeeSalaryAdvanceForm;
