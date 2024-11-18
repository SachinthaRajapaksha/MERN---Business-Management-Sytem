const express = require("express");
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const EmployeeModel = require("../models/EmployeeModel.js");
const DeletedEmployee = require('../models/DeleteEmployeeModel.js');
const EmployeeAttendance = require("../models/EmployeeAttendanceModel");
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');

// Set the directory for uploads to a folder named 'uploads' in the 'public' directory
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set storage options for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Middleware to ensure static files are served
router.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));

// Function to generate JWT token
const generateAuthToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
};

// Helper function to generate 'EID' prefixed employee ID
const generateRandomNumbers = () => {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    return `EID${randomNumber}`;
};

// Login route for employees
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email exists in employees
        const employee = await EmployeeModel.findOne({ email });
        if (employee) {
            const isPasswordMatch = await bcrypt.compare(password, employee.password);
            if (isPasswordMatch) {
                // Redirect based on employee role
                let redirectTo = '';
                switch (employee.role) {
                    case 'Admin':
                        redirectTo = '/Financial/adminpage';
                        break;
                    case 'Product Manager':
                        redirectTo = '/pmanagerpage';
                        break;
                    case 'Inventory Manager':
                        redirectTo = '/imanagerpage';
                        break;
                    case 'Supplier Manager':
                        redirectTo = '/smanagerpage';
                        break;
                    default:
                        redirectTo = `/employee-profile/${employee._id}`; // Redirect to employee profile
                        break;
                }
                const token = generateAuthToken(employee);
                return res.json({ token, redirectTo });
            }
        }

        // If no employee found or password doesn't match
        return res.status(404).json({ message: 'Employee not found or invalid credentials' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});




/// Route to create an employee
router.post('/registerEmployee', upload.single('profilePhoto'), async (req, res) => {
    const { username, firstName, lastName, email, password, role, type, NIC, gender, DOB, contactNo, address, joinedDate } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const existingEmployee = await EmployeeModel.findOne({ email });
    if (existingEmployee) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const empId = generateRandomNumbers();

    try {
        // Generate QR code data
        const qrCodeData = `Employee ID: ${empId}\nFull Name: ${firstName} ${lastName}\nNIC: ${NIC}\nEmail: ${email}\nProfile Photo: ${req.file.filename}`;

        // Generate QR code image
        const qrCodeImage = await QRCode.toDataURL(qrCodeData);

        const profilePhoto = req.file ? req.file.filename : ''; // Save only the filename
        const employee = new EmployeeModel({
            empId, username, firstName, lastName, email, password: hashedPassword, role, type, NIC, gender, DOB, contactNo, address, joinedDate, profilePhoto,
            qrCode: qrCodeImage
        });
        await employee.save();
        res.status(200).send("Employee registered successfully");
    } catch (error) {
        console.error("Error occurred while registering employee:", error);
        res.status(500).send("Error occurred while registering employee");
    }
});



// Get all employees
router.get('/getEmployees', async (req, res) => {
    try {
        const employees = await EmployeeModel.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred while retrieving employees");
    }
});

// Middleware to validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid Object ID'); // Send a 400 Bad Request if ID is not valid
    }
    next();
};

// GET an employee by ID
router.get('/getEmployee/:id', validateObjectId, async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        if (!employee) {
            return res.status(404).send('Employee not found'); // Handle the case where an employee does not exist
        }
        // Construct the URL for the profile photo
        const profilePhotoUrl = `${req.protocol}://${req.get('host')}/uploads/${employee.profilePhoto}`;
        res.status(200).json({ ...employee.toObject(), profilePhoto: profilePhotoUrl });
    } catch (error) {
        console.error('Error retrieving employee:', error);
        res.status(500).send('Internal Server Error'); // General error handling
    }
});


// Backend route to get employee profile photo by ID
router.get('/getEmployeeProfilePhoto/:id', async (req, res) => {
    try {
        // Find the employee by ID
        const employee = await EmployeeModel.findById(req.params.id);
        if (!employee) {
            return res.status(404).send('Employee not found');
        }

        // Check if the employee has a profile photo
        if (!employee.profilePhoto) {
            return res.status(404).send('Employee does not have a profile photo');
        }

        // Construct the file path to the profile photo
        const filePath = path.join(uploadDir, employee.profilePhoto);

        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // If file does not exist, return 404
                return res.status(404).send('Profile photo not found');
            }

            // If file exists, serve the image
            res.sendFile(filePath);
        });
    } catch (error) {
        console.error('Error retrieving employee profile photo:', error);
        res.status(500).send('Internal Server Error');
    }
});






// Update an employee by id including profile photo
router.put('/updateEmployee/:id', upload.single('profilePhoto'), async (req, res) => {
    const { username, firstName, lastName, email, role, type, NIC, gender, DOB, contactNo, address, joinedDate } = req.body;
    try {
        const updatedFields = {
            username, firstName, lastName, email, role, type, NIC, gender, DOB, contactNo, address, joinedDate
        };

        if (req.file) {
            updatedFields.profilePhoto = req.file.filename; // Update profile photo filename if new photo is uploaded
        }

        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

        if (!updatedEmployee) {
            return res.status(404).send('Employee not found');
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred while updating employee");
    }
});


// Backend route to update QR code for an employee by ID
router.put('/updateEmployeeQRCode/:id', async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Generate new QR code data
        const qrCodeData = `${employee.empId}`;
        const newQRCode = await QRCode.toDataURL(qrCodeData);

        // Update the QR code in the database
        employee.qrCode = newQRCode;
        await employee.save();

        res.status(200).json({ message: 'QR code updated successfully', qrCode: newQRCode });
    } catch (error) {
        console.error('Error updating employee QR code:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Backend route to get QR code for an employee by ID
router.get('/generate-qr/:id', async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        const qrData = JSON.stringify({
            employeeId: employee.empId,
            
        });

        const qrCodeURL = await QRCode.toDataURL(qrData);
        res.json({ qrCodeURL });
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ message: 'Failed to generate QR code' });
    }
});



// Backend route to delete QR code for an employee by ID
router.delete('/deleteEmployeeQRCode/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the employee by ID
        const employee = await EmployeeModel.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Remove or clear the QR code
        employee.qrCode = ''; // You can set it to an empty string or null based on your schema
        await employee.save();

        res.status(200).json({ message: 'QR code deleted successfully', employee });
    } catch (error) {
        console.error('Error deleting employee QR code:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Delete an employee
router.delete('/deleteEmployee/:id', async (req, res) => {
    const { id } = req.params;
    const { reason, date } = req.body;

    // Validate if reason and date are provided
    if (!reason || !date) {
        return res.status(400).json({ message: 'Please provide reason and date.' });
    }

    try {
        // Find the employee to be deleted and move to DeletedEmployee
        const employee = await EmployeeModel.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        const deletedEmployee = new DeletedEmployee({
            ...employee.toObject(), // Convert Mongoose document to plain JavaScript object
            reason: reason,
            date: new Date(date)
        });


        // Save deleted employee details
        await deletedEmployee.save();


        // Delete the employee from EmployeeModel
        await EmployeeModel.findByIdAndDelete(id);

        res.json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// Route to get total number of employees
router.get('/getTotalEmployees', async (req, res) => {
    try {
        const totalEmployees = await EmployeeModel.countDocuments();
        res.json({ totalEmployees });
    } catch (error) {
        console.error('Error fetching total employees:', error);
        res.status(500).json({ error: 'Error fetching total employees' });
    }
});



module.exports = router;
