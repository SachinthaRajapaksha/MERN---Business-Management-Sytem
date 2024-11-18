// userController.js
const User = require('../models/User');
const DeletionReason = require('../models/DeletionReason')


exports.register = async (req, res) => {


    // Helper function to generate 'EID' prefixed employee ID
    const generateRandomNumbers = () => {
        const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
        return randomNumber;
    };

    const userID = generateRandomNumbers()

    try {
        const { username, email, password, name, age, gender, address, contactNumber } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already associated with an account' });
        }
        const user = await User.create({ username, email, password, name, age, gender, address, contactNumber , userID});
        console.log(user);
        res.status(201).json({ user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const bcrypt = require('bcrypt');


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: err.message });
    }
};



exports.editUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, age, gender, address, contactNumber } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        user.name = name;
        user.age = age;
        user.gender = gender;
        user.address = address;
        user.contactNumber = contactNumber;

        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { reason } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(userId);

        await DeletionReason.create({ userId, reason });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

exports.getDeletedUsers = async (req, res) => {
    try {
        const deletedUsers = await DeletionReason.find().populate('userId');
        res.status(200).json(deletedUsers);
    } catch (error) {
        console.error('Error fetching deleted users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getTotalRegisteredUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('Error fetching total registered users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getRegisteredUsers = async (req, res) => {
    try {
        const registeredUsers = await User.find({}, { password: 0 });
        res.status(200).json(registeredUsers);
    } catch (error) {
        console.error('Error fetching registered users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// userController.js

exports.filterRegisteredUsers = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Input validation (optional but recommended)
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Please provide both startDate and endDate' });
        }

        // Ensure valid date formats (optional but recommended)
        const isValidStartDate = !isNaN(new Date(startDate));
        const isValidEndDate = !isNaN(new Date(endDate));

        if (!isValidStartDate || !isValidEndDate) {
            return res.status(400).json({ message: 'Invalid date format. Please use YYYY-MM-DD' });
        }

        const users = await User.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });

        res.json(users);
    } catch (error) {
        console.error('Error filtering registered users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.AdmindeleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
