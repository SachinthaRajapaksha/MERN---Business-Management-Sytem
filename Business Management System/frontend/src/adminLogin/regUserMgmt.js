import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegUserMgmt = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRegisteredUsers();
  }, []);

  const fetchRegisteredUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users');
      if (response.status === 200) {
        setRegisteredUsers(response.data);
        setFilteredUsers(response.data); // Initialize filtered users with all registered users
      } else {
        setError('Error fetching registered users');
      }
    } catch (error) {
      setError('Error fetching registered users');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?'); // Confirmation popup
      if (!confirmDelete) return; // If user cancels, do nothing

      const response = await axios.delete(`http://localhost:4000/api/users/admin-delete-user/${userId}`);
      if (response.status === 200) {
        fetchRegisteredUsers(); // Refresh the list of registered users after deletion
      } else {
        setError('Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user');
    }
};

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = registeredUsers.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredUsers(filtered);
  };

  return (
    <div className='container'>
      <h2 className='mt-3 mb-3' style={{ textAlign: 'center' }}>Registered Users</h2> {/* Center align the heading */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control" 
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: '100%' }} // Set the width of the input field to 100%
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
            <th scope="col">Address</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.address}</td>
                <td>{user.contactNumber}</td>
                <td>
                  <button className="btn btn-success" onClick={() => handleDeleteUser(user._id)} style={{ backgroundColor: 'green' }}>Delete</button> {/* Set the button background color to green */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No registered users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegUserMgmt;
