const express = require("express");
const EmployeeLeaveModel = require("../models/EmployeeLeaveModel.js");
const {default: mongoose} = require("mongoose");


// Function to generate a random employee ID


// Create a function to add new employee leave
const addEmployeeLeave = async (req, res) => {
    const { empId, firstName, lastName, role, leaveType, leaveFrom, leaveTo, leaveStatus } = req.body;

    const employeeLeave = new EmployeeLeaveModel({
        empId: empId,
        firstName: firstName,
        lastName: lastName,
        role: role,
        leaveType: leaveType,
        leaveFrom: leaveFrom,
        leaveTo: leaveTo,
        leaveStatus: leaveStatus
    });

    try {
        await employeeLeave.save();
        console.log("Leave application submitted successfully");
        res.status(200).send("Leave application submitted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error occurred while submitting leave application");
    }
};


// Create a function to read all employee leaves
const getAllEmployeeLeave = async (req, res) => {
    try {
        const employeeLeaves = await EmployeeLeaveModel.find();  // Get all leaves
        res.status(200).json(employeeLeaves);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while retrieving data');
    }
};


// Function to get leaves by employee ID
const getLeavesByEmpId = async (req, res) => {
    try {
        const empId = req.params.empId;
        const leaves = await EmployeeLeaveModel.find({ empId: empId });
        res.status(200).json(leaves);
    } catch (error) {
        console.error('Error fetching leaves by employee ID:', error);
        res.status(500).send('Error occurred while retrieving leaves by employee ID');
    }
};


// Create a function to read a single employee's leave by id
const getEmployeeLeave = async (req, res) => {
    try {
        const employeeLeave = await EmployeeLeaveModel.findById(req.params.id);
        console.log('Employee leave read successfully for update');
        res.status(200).json(employeeLeave);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while retrieving data');
    }
};

// Create a function to remove an employee leave by id
const deleteEmployeeLeave = async (req, res) => {
    const objectId = req.params.id;
    try {
        await EmployeeLeaveModel.findByIdAndDelete(objectId);
        res.status(200).send('Employee leave removed successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while deleting data');
    }
};

// Update an employee leave by id
const updateEmployeeLeave = async (req, res) => {
    const objectId = req.params.id;
    const { leaveStatus } = req.body;

    try {
        const updatedLeave = await EmployeeLeaveModel.findByIdAndUpdate(
            objectId,
            { leaveStatus },
            { new: true }
        );
        res.status(200).send(updatedLeave);
        console.log('Employee leave status updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while updating employee leave status');
    }
};

// Accept an employee leave by id
const acceptLeave = async (req, res) => {
    try {
      const { id } = req.params;
      // Assuming you have a Leave model with a field called "status"
      const leave = await Leave.findById(id);
      if (!leave) {
        return res.status(404).json({ message: "Leave not found" });
      }
      if (leave.leaveStatus !== "Pending") {
        return res.status(400).json({ message: "Leave is not pending" });
      }
      leave.leaveStatus = "Accepted";
      await leave.save();
      res.status(200).json({ message: "Leave accepted successfully" });
    } catch (error) {
      console.error("Error accepting leave:", error);
      res.status(500).json({ message: "Failed to accept leave. Please try again." });
    }
  };


  // Function to get leave report for a specific month
const getLeaveReportByMonth = async (req, res) => {
    const { year, month } = req.params;
    try {
        const leaves = await EmployeeLeaveModel.find({
            leaveFrom: {
                $gte: new Date(year, month - 1, 1),
                $lt: new Date(year, month, 1)
            }
        });
        const leaveCount = {
            totalLeaves: leaves.length,
            pendingLeaves: leaves.filter(leave => leave.leaveStatus === 'Pending').length,
            acceptedLeaves: leaves.filter(leave => leave.leaveStatus === 'Accepted').length,
            rejectedLeaves: leaves.filter(leave => leave.leaveStatus === 'Rejected').length
        };
        res.status(200).json(leaveCount);
    } catch (error) {
        console.error('Error fetching leave report by month:', error);
        res.status(500).json({ error: 'Error fetching leave report by month' });
    }
};




// Export all the controller functions as an object
module.exports = { addEmployeeLeave, getAllEmployeeLeave, getEmployeeLeave, getLeavesByEmpId, deleteEmployeeLeave, updateEmployeeLeave, acceptLeave, getLeaveReportByMonth };
