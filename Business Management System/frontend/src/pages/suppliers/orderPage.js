import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../Components/supplier components/Navbar';
import Sidebar from '../../Components/supplier components/Sidebar';
import OrderDetailsModal from '../../Components/supplier components/OrderDetailsModal';

const OrderComponent = () => {
    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
    const [orders, setOrders] = useState([]);
    const [formData, setFormData] = useState({
        orderId: '',
        supname: '',
        quantity: '',
        unitcost: '',
        duedate: '',
        status: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/api/supplier/addorder', formData);
            fetchOrders();
            setFormData({
                orderId: '',
                supname: '',
                quantity: '',
                unitcost: '',
                duedate: '',
                status: ''
            });
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/supplier/allorders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleOpenOrderDetailsModal = (order) => {
        setSelectedOrderDetails(order);
    };

    const handleCloseOrderDetailsModal = () => {
        setSelectedOrderDetails(null);
    };

    const handlePDFGeneration = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/supplier/generate-order-pdf/${orderId}`, {
                responseType: 'blob' // Important to handle binary data
            });
    
            // Create a Blob object representing the data.
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    
            // Create a link element, hide it, direct it towards the blob, and then 'click' it programmatically to trigger the download.
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
    
            // The filename that the PDF will be downloaded as.
            a.download = `order_${orderId}.pdf`;
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

            <NavBar />
            <Sidebar />
            <div className="container" style={{ marginLeft: '120px', paddingTop: '100px' }} >
                <div>
                    <div className="card border-dark mb-3" >
                        <div className="card-header">Add Order</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="Order Id" className="form-label">Order ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Order ID"
                                        name="orderId"
                                        value={formData.orderId}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="supname" className="form-label">Supplier Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Supplier Name"
                                        name="supname"
                                        value={formData.supname}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="qty" className="form-label">Quantity</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="unitcost" className="form-label">Unit cost</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Unit cost"
                                        name="unitcost"
                                        value={formData.unitcost}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="duedate" className="form-label">Due Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="duedate"
                                        name="duedate"
                                        value={formData.duedate}
                                        onChange={handleChange}
                                        placeholder="Due Date"
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">Add Order</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="container mt-5" style={{ marginLeft: '120px' }}>
                    <div className="row">
                        <div className="col">
                            <div className="card border-dark mb-3">
                                <div className="card-header">All Orders</div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Supplier Name</th>
                                                <th>Quantity</th>
                                                <th>Unit cost</th>
                                                <th>Amount</th>
                                                <th>Order Date</th>
                                                <th>Due Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order._id}>
                                                    <td>{order.orderId}</td>
                                                    <td>{order.supname}</td>
                                                    <td>{order.quantity}</td>
                                                    <td>{order.unitcost}</td>
                                                    <td>{order.amount}</td>
                                                    <td>{new Date(order.orderdate).toLocaleDateString()}</td>
                                                    <td>{new Date(order.duedate).toLocaleDateString()}</td>
                                                    <td>{order.status}</td>
                                                    <td>
                                                        <button className="btn btn-primary me-2" onClick={() => handleOpenOrderDetailsModal(order)} >View</button>
                                                        <button className="btn btn-danger" onClick={() => handlePDFGeneration(order.orderId)} >Get Invoice</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selectedOrderDetails && (
                <OrderDetailsModal
                    orderDetails={selectedOrderDetails}
                    handleCloseModal={handleCloseOrderDetailsModal}
                />
            )}

        </div>

    );
};

export default OrderComponent;
