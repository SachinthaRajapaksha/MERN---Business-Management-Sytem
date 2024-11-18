import React from 'react';

const OrderDetailsModal = ({ orderDetails, handleCloseModal }) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl" role="document" >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Invoice</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text"><strong>Supplier Name: </strong>{orderDetails.supname}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text"><strong>Order Date: </strong>{new Date(orderDetails.orderdate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text"><strong>Order Status: </strong>{orderDetails.status}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text"><strong>Due Date: </strong>{new Date(orderDetails.duedate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="additional-bonuses border p-3 rounded mb-3 mt-3">
                    <p><strong>Summary:</strong></p>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Order Id</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Unit cost</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{orderDetails.orderId}</td>
                          <td>{orderDetails.quantity}</td>
                          <td>{orderDetails.unitcost}</td>
                          <td>{orderDetails.amount}</td>
                        </tr>
                      </tbody>
                    </table>
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

export default OrderDetailsModal;
