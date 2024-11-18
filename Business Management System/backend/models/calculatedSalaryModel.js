const mongoose = require('mongoose');

const CalculatedSalarySchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  employeeType: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  basicSalary: {
    type: Number,
    required: true,
  },
  baseSalary: {
    type: Number,
    required: true,
  },
  additionalBonuses: [{
    amount: {
      type: Number,
      required: false,
    },
    detail: {
      type: String,
      required: false,
    },
  }],
  generalDeductions: [{
    amount: {
      type: Number,
      required: false,
    },
    detail: {
      type: String,
      required: false,
    },
  }],
});

module.exports = mongoose.model('CalSal', CalculatedSalarySchema);