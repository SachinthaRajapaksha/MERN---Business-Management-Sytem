const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  NIC: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  },
  DOB: {
    type: Date,
  },
  contactNo: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  joinedDate: {
    type: String,
    required: true,
    
  },
  resignationDate: {
    type: Date,
  },

  profilePhoto: {
     type: String 
    },

  qrCode: {
    type: String,
    
  }

});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;