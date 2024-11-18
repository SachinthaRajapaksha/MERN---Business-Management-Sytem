import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminSalaryAdvanceRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/incomes/pendingrequests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleAction = async (requestId, status) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to ${status === 'accepted' ? 'accept' : 'reject'} this request?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      });
  
      if (result.isConfirmed) {
        // Perform action
        await axios.put(`http://localhost:4000/api/incomes/updatesalaryadvancerequest/${requestId}`, { status });
        // Remove the request from the list after action is taken
        setRequests(requests.filter((request) => request._id !== requestId));
        Swal.fire('Success', 'Request updated successfully', 'success');
      }
    } catch (error) {
      console.error('Error updating request:', error);
      Swal.fire('Error', 'Failed to update request', 'error');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {requests.map((request) => (
          <div key={request._id} className="col-md-6">
            <div className="card shadow p mb-3 ">
              <div className="card-body">
                <div className="border border-dark rounded p-3 mb-3">
                  <h5 className="card-title">Employee ID: {request.empId}</h5>
                </div>
                <div className="border border-dark rounded p-3 mb-3">
                  <p className="card-text">Name: {request.name}</p>
                </div>
                <div className="border border-dark rounded p-3 mb-3">
                  <p className="card-text">Amount: {request.amount}</p>
                </div>
                <div className="border border-dark rounded p-3 mb-3">
                  <p className="card-text">Description: {request.description}</p>
                </div>
                <div className="border border-dark rounded p-3 mb-3">
                  <p className="card-text">Date: {new Date(request.date).toLocaleDateString()}</p>
                </div>
                <div className="border border-dark rounded p-3 mb-3">
                  <p className="card-text">Status: {request.status}</p>
                </div>
                {request.status === 'pending' && (
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-success me-2" onClick={() => handleAction(request._id, 'accepted')}>Accept</button>
                    <button className="btn btn-danger" onClick={() => handleAction(request._id, 'rejected')}>Reject</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSalaryAdvanceRequests;
