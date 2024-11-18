const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
  employeeType: {
    type: String,
    required: true,
  },
  grossSalary: {
    type: Number,
    required: true
  },
  additionalBonuses: [{
    amount: {
      type: Number,
      required: false
    },
    detail: {
      type: String,
      required: false
    }
  }],
  generalDeductions: [{
    amount: {
      type: Number,
      required: false
    },
    detail: {
      type: String,
      required: false
    }
  }],
  month: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Payroll', PayrollSchema);
