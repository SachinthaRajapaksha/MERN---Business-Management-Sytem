const express = require('express');
const router = express.Router();
const moment = require('moment');
const Employee = require('../models/EmployeeAttendanceModel');

// Mark attendance
router.post('/mark', async (req, res) => {
  const { empId } = req.body;
  const date = moment().format('YYYY-MM-DD');
  const arrivaltime = moment().format('HH:mm:ss');

  try {
    let employee = await Employee.findOne({ empId });

    if (!employee) {
      employee = new Employee({ empId, attendance: [] });
    }

    const existingRecord = employee.attendance.find((record) => record.date === date);
    if (!existingRecord) {
      employee.attendance.push({ arrivaltime, date, status: 'present' });
    }

    await employee.save();
    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get today's attendance status
router.get('/status/:empId', async (req, res) => {
  const { empId } = req.params;
  const date = moment().format('YYYY-MM-DD');

  try {
    const employee = await Employee.findOne({ empId });
    if (!employee) {
      return res.status(404).json({ status: 'absent' });
    }

    const record = employee.attendance.find((record) => record.date === date);
    if (!record) {
      return res.status(404).json({ status: 'absent' });
    }

    res.status(200).json({ status: record.status });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get today's attendance status for all employees
router.get('/all-today', async (req, res) => {
  const date = moment().format('YYYY-MM-DD');
  try {
    const employees = await Employee.find();
    const attendanceData = employees.map((employee) => {
      const record = employee.attendance.find((record) => record.date === date);
      return {
        empId: employee.empId,
        status: record ? record.status : 'absent',
      };
    });
    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
