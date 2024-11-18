const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: true

    },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                // Check if value is a positive integer
                return Number.isInteger(value) && value >= 0;
            },
            message: props => `${props.value} is not a valid age. Age must be a positive integer.`
        }
    },
    gender: { type: String, enum: ['male', 'female'], required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', userSchema);
