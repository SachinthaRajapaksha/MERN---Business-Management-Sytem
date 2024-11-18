import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddPayrollModal from './AddNewGenPay';
import UpdatePayrollModal from './UpdatePayrollModal';

const DisplayGenPay = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPayrollId, setSelectedPayrollId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/incomes/allpayrolls');
      setPayrolls(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateGenPayrolls = () => {
    axios.get("http://localhost:4000/api/incomes/allpayrolls")
      .then(result => setPayrolls(result.data))
      .catch(error => console.log(error))
  }

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    fetchPayrolls();
  };

  const handleUpdateClick = (payrollId) => {
    
    Swal.fire({
      title: 'Update Payroll Information',
      text: 'Do you want to update the payroll information?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        setSelectedPayrollId(payrollId);
        setShowUpdateModal(true);
      }
    });
  };

  const handleCloseUpdateModal = () => {
    setSelectedPayrollId(null);
    setShowUpdateModal(false);
    fetchPayrolls();
  };


  const handleDelete = async (payrollId) => {

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this payroll info?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/api/incomes/deletepayroll/${payrollId}`);
        fetchPayrolls();
        Swal.fire(
          'Deleted!',
          'Payroll info has been deleted.',
          'success'
        );
      } catch (error) {
        console.error(error);
        Swal.fire(
          'Error!',
          'An error occurred while deleting payroll info.',
          'error'
        );
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your payroll info is safe :)',
        'info'
      );
    }
  }

  const filteredPayrolls = payrolls.filter(payroll =>
    payroll.employeeType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="main-content-container" style={{ marginTop: '1px', marginBottom: '30px', paddingTop: '40px' }}>
        <div className="d-flex" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className=" d-flex " style={{  marginRight: '400px' }} >
            <h4 >Calculate Employee Salaries based on designation </h4>
          </div>
          <form className="d-flex">
            <input
              className="form-control"
              type="search"
              placeholder="Search Employee Type"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '200px', marginRight:'10px' }}
            />
          </form>
          <button className='btn btn-success' onClick={handleShowAddModal} >+ Add payroll data</button>
        </div>
      </div>

      <div className="table-wrapper" style={{
        maxHeight: '530px',
        overflowY: 'auto',
        paddingLeft:'80px',
        paddingRight: '8px',
      }}>
        <table className="table table-striped"  >
          <thead class="table-dark" >
            <tr>
              <th style={{ width: '14%' }} >Employee Designation</th>
              <th style={{ width: '8%' }} >Basic Salary</th>
              <th style={{ width: '29%' }} >Additions</th>
              <th style={{ width: '29%' }}>Deductions</th>
              <th style={{ width: '6%' }} >month</th>
              <th style={{ width: '12.5%' }} >Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayrolls.map(payroll => (
              <tr key={payroll._id}>
                <td>{payroll.employeeType}</td>
                <td>{payroll.grossSalary}</td>
                <td style={{ maxWidth: '340px', wordWrap: 'break-word' }} >
                  {payroll.additionalBonuses.map((bonus, index) => (
                    <div key={index}>
                      <ul>
                        <li><p>{bonus.detail}</p>
                          <p><strong>Amount:</strong> {bonus.amount}</p></li>
                      </ul>
                    </div>
                  ))}
                </td>
                <td style={{ maxWidth: '340px', wordWrap: 'break-word' }} >
                  {payroll.generalDeductions.map((deduction, index) => (
                    <div key={index}>
                      <ul>
                        <li><p>{deduction.detail}</p>
                          <p><strong>Amount:</strong> {deduction.amount}</p></li>
                      </ul>
                    </div>
                  ))}
                </td>
                <td>{payroll.month}</td>
                <td style={{ maxWidth: '157px' }} >
                  <div class="btn-group" role="group" >
                    <button className="btn btn-primary" onClick={() => handleUpdateClick(payroll._id)}><i class="bi bi-pencil"></i> Update</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(payroll._id)} ><i class="bi bi-trash3"></i> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <style>
          {`
      .table-wrapper::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
      }

      .table-wrapper::-webkit-scrollbar {
        width: 5px;
        background-color: #F5F5F5;
      }

      .table-wrapper::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #2BB22B  ;
      }
    `}
        </style>

      </div>

      {showAddModal && (
        <AddPayrollModal
          handleCloseModal={handleCloseAddModal}
          updateGenPayrolls={updateGenPayrolls}
        />
      )}

      {showUpdateModal && (
        <UpdatePayrollModal
          handleCloseModal={handleCloseUpdateModal}
          payrollId={selectedPayrollId}
          updateGenPayrolls={updateGenPayrolls}
        />
      )}


    </div>
  );
};

export default DisplayGenPay;
