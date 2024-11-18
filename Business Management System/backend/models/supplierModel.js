const mongoose = require('mongoose')

const Schema = mongoose.Schema

const supplierSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    supId: {
        type: String,
        required: true,
        unique: true
    },
    supname: {
        type: String,
        required: true
    },
    supMaterial: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Supplierss', supplierSchema)