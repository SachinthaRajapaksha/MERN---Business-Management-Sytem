const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  arrivaltime: String,
  date: String,
  status: String,
});

const employeeAttendanceSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  attendance: [attendanceSchema],
});

const EmployeeAttendance = mongoose.model('employeeattendance', employeeAttendanceSchema);

module.exports = EmployeeAttendance;