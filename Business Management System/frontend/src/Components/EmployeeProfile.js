import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../images/b2.png';

function EmployeeProfile() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [qrCode, setQRCode] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch employee data
        const empResponse = await axios.get(`http://localhost:4000/api/employees/getEmployee/${id}`);
        setEmployee(empResponse.data);
        setQRCode(empResponse.data.qrCode);

        // Fetch leaves data, using the empId from the fetched employee data
        if (empResponse.data && empResponse.data.empId) {
          const leavesResponse = await axios.get(`http://localhost:4000/api/employees/leave/getEmployeeLeavesByEmpId/${empResponse.data.empId}`);
          setLeaves(leavesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]); // Only re-run the effect if the id changes

  const handleLeave = (id) => {
    navigate(`/employee-leave/${id}`, { state: { employee: employee } })
  }

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qr_code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (!employee) {
    return <div>Loading...</div>;
  }



  return (
    <section style={{ backgroundColor: "#dcfce7" }}>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }} />


      <div className="container py-5">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item active" aria-current="page"><h5>Employee Profile</h5></li>
              </ol>
            </nav>
          </div>
        </div>


        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={employee.profilePhoto ? employee.profilePhoto : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                  alt="Profile Avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
                <h4 className="my-3">{employee.firstName} {employee.lastName}</h4>
                <p className="text-muted mb-1">{employee.empId}</p>
                <p className="text-muted mb-1">{employee.role}</p>
                <p className="text-muted mb-4"></p>
                <div className="d-flex justify-content-center mb-2">
                  <Link to={`/employee-edit/${employee._id}`} className="btn btn-primary">Edit</Link>
                </div><hr />
                  <h5 className="card-title mb-4">Apply Leave</h5>
                  <button onClick={() => handleLeave(id)} className="btn btn-primary">Apply Leave</button>
                  <hr/>
                  <h5 className="card-title mb-4">Salary Details and Salary Advance</h5>
                  <Link to={`/Financial/pp`} className="btn btn-primary">Portal</Link>
              </div>
            </div>

            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12"> 
                      <div className="card-body text-center"> 
                        <h5 className="card-title mb-4">QR Code</h5>
                        <div className="d-flex flex-column align-items-center justify-content-center"> 
                          {qrCode &&
                          <div>
                            <img
                              src={qrCode}
                              alt="QR Code"
                              className="img-fluid"
                              style={{ maxWidth: "200px", height: "200px" }}
                            />
                            <button onClick={downloadQRCode} className="btn btn-primary mt-3">Download QR Code</button>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          

          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Employee ID</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.empId}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.firstName} {employee.lastName}</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">User Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.username}</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.email}</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Role</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.role}</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Type</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.type}</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">NIC</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.NIC}</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Gender</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.gender}</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Date of Birth</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.DOB}</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Contact Number</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.contactNo}</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.address}</p>
                  </div>
                </div>
                <hr />



              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Leave History</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaves.map(leave => (
                      <tr key={leave._id}>
                        <td>{leave.leaveType}</td>
                        <td>{new Date(leave.leaveFrom).toLocaleDateString()}</td>
                        <td>{new Date(leave.leaveTo).toLocaleDateString()}</td>
                        <td>{leave.leaveStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeProfile;