import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Trans from './pages/IncomeExpense/Trans';
import FinancialDashboard from './pages/IncomeExpense/Dashboard';
import Emppayroll from './pages/IncomeExpense/Emppayroll';
import Placeholder from './pages/IncomeExpense/EmpAdvancePage';
import AdminPage from './pages/adminPage';
import Testp from './pages/IncomeExpense/EmployeeAdvanceReqPage';
import EmpSalPage from './pages/IncomeExpense/EmpSalPage';
import SalaryDetails from './pages/IncomeExpense/Payrollp';
import AddEmployee from "./Components/AddEmployee";
import EmployeeProfile from "./Components/EmployeeProfile";
import EmployeeTable from "./Components/EmployeeTable";
import AdminEditEmployee from "./Components/AdminEditEmployee";
import EditEmployee from "./Components/EditEmployee";
import EmployeeAdminDashboard from "./Components/EmployeeAdminDashboard";
import AddEmployeeLeave from "./Components/AddEmployeeLeave";
import EmployeeLeaveTable from "./Components/EmployeeLeaveTable";
import LeaveReportPage from './Components/LeaveReportPage';
import LoginForm from "./Login";
import AdminDashboard from "./Components/adminDashboard"
import EmployeeProfileAdmin from "./Components/EmployeeProfileAdmin";
import EmployeeAttendance from "./Components/EmployeeAttendance";
import EmployeeAttendanceTable from "./Components/EmployeeAttendanceTable";
import QrScanner from "./Components/QrScanner";
import SupplierForm from './pages/suppliers/suppliers';
import OrderComponent from './pages/suppliers/orderPage';
import Regpage from "./regpage/regpage";
import Login from "./loginpage/loginpage";
import Adminlogin from "./adminLogin/adminlogin";
import Report from "./adminLogin/reportGen";
import HomePage from "./first/fpage";
import image from './img/logo.png';
import Home from "./adminLogin/adminMain";
import RegUserMgmt from "./adminLogin/regUserMgmt"; 

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/Financial/trans' element={<Trans />}></Route>
          <Route path='/Financial/dash' element={<FinancialDashboard />}></Route>
          <Route path='/Financial/payroll' element={<Emppayroll />}></Route>
          <Route path='/Financial/place' element={<Placeholder />}></Route>
          <Route path='/Financial/empsal' element={<EmpSalPage />}></Route>
          <Route path='/Financial/adminpage' element={<AdminPage />}></Route>
          <Route path='/Financial/pp' element={<SalaryDetails />}></Route>
          <Route path='/Financial/tp' element={<Testp />}></Route>
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/employee-profile/:id" element={<EmployeeProfile />} />
          <Route path="/employee-table" element={<EmployeeTable />} />
          <Route path="/employee-edit/:id" element={<EditEmployee />} />
          <Route path="/admin-employee-edit/:id" element={<AdminEditEmployee />} />
          <Route path="/employee-admin-dashboard" element={<EmployeeAdminDashboard />} />
          <Route path="/employee-leave/:id" element={<AddEmployeeLeave />} />
          <Route path="/employee-leave-table" element={<EmployeeLeaveTable />} />
          <Route path="/leave-report" element={<LeaveReportPage/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/adminpage" element={<AdminDashboard />} />
          <Route path="/employee-profile-admin/:id" element={<EmployeeProfileAdmin />} />
          <Route path="/employee-attendance" element={<EmployeeAttendance />} />
          <Route path="/employee-attendance-table" element={<EmployeeAttendanceTable />} />
          <Route path="/qr-scanner" element={<QrScanner />} />
          <Route path='/suppliers/home' element={<SupplierForm/>}></Route>
          <Route path='/suppliers/order' element={<OrderComponent/>}></Route>
          <Route path="/reg" element={<Regpage />} />
          <Route path="/log" element={<Login />} />
          <Route path="/admin" element={<Adminlogin />} />
          <Route path="/report" element={<Report />} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/adminD" element={<Home/>} />
          <Route path="/registered" element={<RegUserMgmt/>} />
       </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;