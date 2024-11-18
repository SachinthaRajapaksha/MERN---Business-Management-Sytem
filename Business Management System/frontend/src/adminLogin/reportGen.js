import React, { useState, useEffect } from 'react';

export default function Report() {
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [totalRegisteredUsers, setTotalRegisteredUsers] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchDeletedUsers();
    fetchTotalRegisteredUsers();
    fetchRegisteredUsers();
  }, [startDate, endDate]);

  const fetchDeletedUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/deleted-users');
      if (response.ok) {
        const data = await response.json();
        setDeletedUsers(data);
      } else {
        setError('Error fetching deleted users');
      }
    } catch (error) {
      setError('Error fetching deleted users');
    }
  };

  const fetchTotalRegisteredUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/total-registered-users');
      if (response.ok) {
        const data = await response.json();
        setTotalRegisteredUsers(data.totalUsers);
      } else {
        setError('Error fetching total registered users');
      }
    } catch (error) {
      setError('Error fetching total registered users');
    }
  };

  const fetchRegisteredUsers = async () => {
    try {
      let url = 'http://localhost:4000/api/users';
      if (startDate && endDate) {
        const formattedStartDate = startDate.toLocaleDateString('en-CA');
        const formattedEndDate = endDate.toLocaleDateString('en-CA');
        url += `?startDate=<span class="math-inline">\{formattedStartDate\}&endDate\=</span>{formattedEndDate}`;
      }
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const sortedUsers = data.sort((a, b) => a.username.localeCompare(b.username));
        setRegisteredUsers(sortedUsers);
      } else {
        setError('Error fetching registered users');
      }
    } catch (error) {
      setError('Error fetching registered users');
    }
  };

  const handleFilter = async () => {
    try {
      if (startDate && endDate) {
        const formattedStartDate = startDate.toLocaleDateString('en-CA');
        const formattedEndDate = endDate.toLocaleDateString('en-CA');
        const filteredUsers = await filterRegisteredUsers(formattedStartDate, formattedEndDate);
        setRegisteredUsers(filteredUsers);
      } else {
        setError('Please select both start and end dates to apply filter');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const filterRegisteredUsers = async (startDate, endDate) => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/filter-registered-users?startDate=<span class="math-inline">\{startDate\}&endDate\=</span>{endDate}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Error fetching filtered registered users');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <div className='container'>
      <h2 className='mt-3'>Deleted Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Reason</th>
          </tr>
        </thead>
        <tbody>
          {deletedUsers.map((user, index) => (
            <tr key={user?._id} className={index % 2 === 0 ? 'table-primary' : 'table-secondary'}>
              <td>{user?.email}</td>
              <td>{user?.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className='mt-3'>Filter Registered Users by Registration Date</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="startDate" className="form-label">Start Date:</label>
          <input type="date" className="form-control" id="startDate" value={startDate ? startDate.toISOString().substr(0, 10) : ''} onChange={(e) => setStartDate(new Date(e.target.value))} />
        </div>
        <div className="col-md-4">
          <label htmlFor="endDate" className="form-label">End Date:</label>
          <input type="date" className="form-control" id="endDate" value={endDate ? endDate.toISOString().substr(0, 10) : ''} onChange={(e) => setEndDate(new Date(e.target.value))} />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary mt-4" onClick={handleFilter}>Apply Filter</button>
        </div>
      </div>

      <h2 className='mt-3'>Registered Users</h2>
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
          </tr>
        </thead>
        <tbody>
          {registeredUsers.map((user, index) => (
            <tr key={user?._id} className={index % 2 === 0 ? 'table-primary' : 'table-secondary'}>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
              <td>{user?.name}</td>
              <td>{user?.age}</td>
              <td>{user?.gender}</td>
              <td>{user?.address}</td>
              <td>{user?.contactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
