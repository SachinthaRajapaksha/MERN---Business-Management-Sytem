import React from 'react';

const UserDetailsModal = ({ userDetails, handleCloseModal }) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl" role="document" >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Salary Slip</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <div className="card">
                    <div className="card-body">

                      <p className="card-text"><strong>Employee ID: </strong>{userDetails.userId}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card">
                    <div className="card-body">

                      <p className="card-text"><strong>Username: </strong>{userDetails.username}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text"><strong>Designation: </strong>{userDetails.employeeType}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text"><strong>Month: </strong>{userDetails.month}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-body">

                      <p className="card-text"><strong>Basic Salary: </strong>{userDetails.basicSalary}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="additional-bonuses border p-3 rounded mb-3 mt-3">
                    <p><strong>Additions:</strong></p>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Details</th>
                          <th scope="col" style={{ width: '20%' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userDetails.additionalBonuses.map((bonus, index) => (
                          <tr key={index}>
                            <td>{bonus.detail}</td>
                            <td>{bonus.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="general-deductions border p-3 rounded mb-3">
                    <p><strong>Deductions:</strong></p>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Details</th>
                          <th scope="col" style={{ width: '20%' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userDetails.generalDeductions.map((deduction, index) => (
                          <tr key={index}>
                            <td>{deduction.detail}</td>
                            <td>{deduction.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <div className="net-salary border p-3 rounded mb-3">
                    <p><strong>Net Salary:</strong> {userDetails.baseSalary}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
