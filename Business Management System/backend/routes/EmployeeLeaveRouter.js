const express = require("express");
const { addEmployeeLeave, getAllEmployeeLeave, getEmployeeLeave, getLeavesByEmpId, deleteEmployeeLeave, updateEmployeeLeave, getLeaveReportByMonth } = require('../controller/EmployeeLeaveController.js');
const EmployeeLeave = require('../models/EmployeeLeaveModel.js');

const router = express.Router();

console.log('IN employeeLeaveRouter');

//add employee leave
router.post('/addEmployeeLeave', addEmployeeLeave);

//get all employees' leaves
router.get('/getEmployeeLeave', getAllEmployeeLeave);

//get one employee's leave by id
router.get('/getEmployeeLeave/:id', getEmployeeLeave);

// New route to get leaves by employee ID
router.get('/getEmployeeLeavesByEmpId/:empId', getLeavesByEmpId);

//delete employee leave by id
router.delete('/deleteEmployeeLeave/:id', deleteEmployeeLeave);

//update employee leave by id
router.put('/updateEmployeeLeave/:id', updateEmployeeLeave);

// Route to get report for leaves by month
router.get('/leaveReport/month/:year/:month', getLeaveReportByMonth);


// Route to get total pending leave count
router.get('/getPendingLeaveCount', async (req, res) => {
    try {
        const totalPendingLeave = await EmployeeLeave.countDocuments({ leaveStatus: 'Pending' });
        res.json({ totalPendingLeave });
    } catch (error) {
        console.error('Error fetching total pending leave:', error);
        res.status(500).json({ error: 'Error fetching total pending leave' });
    }
});

module.exports=router;

