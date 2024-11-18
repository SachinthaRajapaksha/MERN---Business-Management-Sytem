import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateSalaryModal from './UpdateSalaryModal';
import UserDetailsModal from './EmpSalSlipModal';



const EmployeeSalaryTable = () => {
  const [employeeSalaries, setEmployeeSalaries] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [calculatedSalaries, setCalculatedSalaries] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    fetchEmployeeSalaries();
    fetchCalculatedSalaries(); // Fetch calculated salaries when the component mounts
  }, []);

  const fetchEmployeeSalaries = async () => {
    try {
      const employeeResponse = await axios.get('http://localhost:4000/api/employees/getEmployees');
      const payrollsResponse = await axios.get('http://localhost:4000/api/incomes/allpayrolls');

      const employee = employeeResponse.data;
      const payrolls = payrollsResponse.data;

      const calculatedSalaries = employee.map(employee => {
        const payroll = payrolls.find(p => p.employeeType === employee.type);
        if (!payroll) {
          return { empId: employee.empId, username: employee.username, employeeType: employee.type, baseSalary: 'N/A', additionalBonuses: [], generalDeductions: [] };
        }

        let baseSalary = payroll.grossSalary;
        const additionalBonusesSum = payroll.additionalBonuses.reduce((acc, bonus) => acc + bonus.amount, 0);
        const generalDeductionsSum = payroll.generalDeductions.reduce((acc, deduction) => acc + deduction.amount, 0);
        baseSalary += additionalBonusesSum;
        baseSalary -= generalDeductionsSum;

        return { empId: employee.empId, username: employee.username, employeeType: employee.type, email: employee.email, baseSalary, additionalBonuses: payroll.additionalBonuses, generalDeductions: payroll.generalDeductions, month: payroll.month, basicSalary: payroll.grossSalary };
      });

      setEmployeeSalaries(calculatedSalaries);
    } catch (error) {
      console.error('Error fetching employee salaries:', error);
    }
  };

  const fetchCalculatedSalaries = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/incomes/allempsal');
      setCalculatedSalaries(response.data);
    } catch (error) {
      console.error('Error fetching calculated salaries:', error);
    }
  };

  const saveCalculatedSalaries = async () => {
    try {
      
      const response = await axios.post('http://localhost:4000/api/incomes/savecalculatedsalaries', employeeSalaries);
      console.log('Saved salaries response:', response.data);

      await fetchEmployeeSalaries();

      await fetchCalculatedSalaries();

      alert("Salaries Calculated")

    } catch (error) {
      console.error('Error saving calculated salaries:', error);
    }
  };

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
    setSelectedUsers([]);
  };

  const handleUserSelection = (empId) => {
    const newSelectedUsers = selectedUsers.includes(empId)
      ? selectedUsers.filter(id => id !== empId)
      : [...selectedUsers, empId];
    setSelectedUsers(newSelectedUsers);
  };

  const filteredSalaries = employeeSalaries.filter(salary => {
    const { empId, username, employeeType } = salary;
    const query = searchQuery.toLowerCase();
    return (
      empId.toLowerCase().includes(query) ||
      username.toLowerCase().includes(query) ||
      employeeType.toLowerCase().includes(query)
    );
  });

  const handleModifyPayrolls = () => {
    setShowUpdateModal(true); // Show the modal when "Modify Payrolls" button is clicked
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    alert("Payroll Updated")
  };

  const handleSaveUpdate = async () => {
    await fetchCalculatedSalaries(); // Fetch updated calculated salaries after saving changes in modal
  };

  // Function to handle opening the user details modal
  const handleOpenUserDetailsModal = (empId) => {
    const userDetails = calculatedSalaries.find((cs) => cs.empId === empId);
    setSelectedUserDetails(userDetails);
  };

  // Function to handle closing the user details modal
  const handleCloseUserDetailsModal = () => {
    setSelectedUserDetails(null);
  };

  const clearPayrollData = async () => {
    const isConfirmed = window.confirm("Are you sure you want to clear monthly payroll data?");
    if (isConfirmed) {
      try {
        await axios.delete('http://localhost:4000/api/incomes/clearcalculatedsalaries');
        await fetchCalculatedSalaries(); // Fetch updated calculated salaries after clearing data
      } catch (error) {
        console.error('Error clearing payroll data:', error);
      }
    }
  };

  const handleAddTotalEmployeePayroll = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/incomes/addTotalEmployeePayroll');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error adding total employee payroll:', error);
      alert('Failed to add total employee payroll. Please try again.');
    }
  };

  const handleSendPayrolls = async () => {
    try {
      setIsLoading(true);
      await axios.post('http://localhost:4000/api/incomes/sendpayrolls');
      await handleAddTotalEmployeePayroll();
      alert('Payrolls sent successfully');
    } catch (error) {
      console.error('Error sending payrolls:', error);
      if (error.response && error.response.status === 421) {
      } else {
        alert('Failed to send payrolls. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container mt-5" style={{ marginLeft: '120px', marginTop: '90px' }} >
      <div style={{ marginBottom: '30px' }} >
        <strong style={{ fontSize: '24px' }}>Payrolls of all employees</strong>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-primary" onClick={toggleCheckboxes}>
          {showCheckboxes ? 'Hide Selection' : 'Select Users'}
        </button>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by Employee ID, Employee Name, Employee Type"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '440px' }}
          />
        </form>
        <div>
          <button className="btn btn-danger me-2" onClick={clearPayrollData}><i class="bi bi-trash-fill"></i> Clear Payroll Data</button>
          <button className="btn btn-success me-2" onClick={saveCalculatedSalaries}>
          <i class="bi bi-calculator"></i> Calculate Payrolls
          </button>
          <button className="btn btn-success" onClick={handleModifyPayrolls}>
          <i class="bi bi-pencil"></i> Modify Payrolls
          </button>
        </div>
      </div>
      <div className="table-wrapper" style={{
        maxHeight: '500px',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        paddingRight: '8px',
        WebkitScrollbarWidth: 'thin',
        scrollbarWidth: 'thin',
        scrollbarColor: '#f1f1f1 #888',
      }}>
        <table className="table" >
          <thead class="table-light" >
            <tr>
              {showCheckboxes && <th>Select</th>}
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Employee Designation</th>
              <th>Calculated Payroll</th>
              <th>See Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.map((salary, index) => (
              <tr key={index}>
                {showCheckboxes && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(salary.empId)}
                      onChange={() => handleUserSelection(salary.empId)}
                    />
                  </td>
                )}
                <td>{salary.empId}</td>
                <td>{salary.username}</td>
                <td>{salary.employeeType}</td>
                <td>
                  {Array.isArray(calculatedSalaries) ? calculatedSalaries.find(cs => cs.empId === salary.empId)?.baseSalary || 'N/A' : 'N/A'}
                </td>
                <td>
                  <button className="btn btn-secondary" onClick={() => handleOpenUserDetailsModal(salary.empId)} ><i class="bi bi-card-list"></i></button>
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
        width: 12px;
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
      <div className="container" style={{ marginTop: '20px', marginBottom: '30px' }} >
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary" onClick={handleSendPayrolls} disabled={isLoading}>
                {isLoading ? 'Sending Payrolls...' : 'Initiate Payrolls & Notify users via email'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showUpdateModal && (
        <UpdateSalaryModal
          handleCloseModal={handleCloseUpdateModal}
          selectedUsers={selectedUsers}
          handleSaveUpdate={handleSaveUpdate}
        />
      )}

      {selectedUserDetails && (
        <UserDetailsModal
          userDetails={selectedUserDetails}
          handleCloseModal={handleCloseUserDetailsModal}
        />
      )}
    </div>
  );
};

export default EmployeeSalaryTable;
