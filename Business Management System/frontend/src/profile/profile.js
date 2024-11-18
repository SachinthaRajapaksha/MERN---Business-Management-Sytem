import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Organic from '../img/coconut.jpeg'; // Assuming the path is correct

export default function Profile({ user }) {
    const [show, setShow] = useState(false);
    const [editedUser, setEditedUser] = useState(user);
    const [editSuccess, setEditSuccess] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteReason, setDeleteReason] = useState('');

    const handleClose = () => {
        setShow(false);
        setEditSuccess(false);
    };

    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirmation = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/users/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reason: deleteReason }) // Send the reason for deletion
            });
            if (response.ok) {
                // Handle success
                window.location.reload(); // Or any other action you want to perform after deletion
            } else {
                console.error('Error deleting user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedUser)
            });
            if (response.ok) {
                setEditedUser(editedUser);
                setEditSuccess(true);
                handleClose();
                window.location.reload();
            } else {
                console.error('Error updating user:', response.statusText);
            }

        } catch (error) {
            console.error('Error updating user:', error.message);
        }
    };

    return (
        <div className='container-fluid mt-5' style={{ backgroundImage: `url(${Organic})`, backgroundSize: 'cover', height: '100vh' }}>
            <div className='container' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', height: '100%' }}>
                <h1 className='text-center' style={{ fontSize: '50px', color: '#ffffff', fontFamily: 'cursive', marginBottom: '30px' }}>PROFILE</h1>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='card text-left'>
                            <div className="card-header pt-3 pb-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                                <h1 style={{ fontSize: '30px', color: '#ffffff' }}><center>Welcome</center></h1>
                            </div>
                            <h5 className="card-title pt-3 pb-3"><center><i>{user.email}</i></center></h5>
                            <p><b>Email:</b> {user.email}</p>
                            <p><b>Age:</b> {user.age}</p>
                            <p><b>Gender:</b> {user.gender}</p>
                            <p><b>Address:</b> {user.address}</p>
                            <p><b>Contact Number:</b> {user.contactNumber}</p>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <form style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px' }}>
                            <div className="form-group">
                                <label htmlFor="name" style={{ color: '#ffffff' }}>Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={editedUser.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" style={{ color: '#ffffff' }}>Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={editedUser.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="age" style={{ color: '#ffffff' }}>Age</label>
                                <input type="number" className="form-control" id="age" name="age" value={editedUser.age} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender" style={{ color: '#ffffff' }}>Gender</label>
                                <input type="text" className="form-control" id="gender" name="gender" value={editedUser.gender} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address" style={{ color: '#ffffff' }}>Address</label>
                                <input type="text" className="form-control" id="address" name="address" value={editedUser.address} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contactNumber" style={{ color: '#ffffff' }}>Contact Number</label>
                                <input type="text" className="form-control" id="contactNumber" name="contactNumber" value={editedUser.contactNumber} onChange={handleChange} />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className='col-md-4 offset-md-4'>
                        <Button variant="success" className='w-100 mb-2' style={{ backgroundColor: '#00563B', border: '2px solid #00563B' }} onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                        <Button variant="success" className='w-100' style={{ backgroundColor: '#00563B', border: '2px solid #00563B' }} onClick={handleDelete}>
                            Delete Account
                        </Button>
                    </div>
                </div>

                {editSuccess && (
                    <div className="alert alert-success mt-3" role="alert">
                        User information updated successfully!
                    </div>
                )}

                <Modal show={show} onHide={handleClose}>
                    {/* Modal content */}
                </Modal>

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reason for Account Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="deleteReason">
                            <Form.Label>Please provide a reason for deleting your account:</Form.Label>
                            <Form.Control as="textarea" rows={3} value={deleteReason} onChange={(e) => setDeleteReason(e.target.value)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleDeleteConfirmation}>
                            Delete Account
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
