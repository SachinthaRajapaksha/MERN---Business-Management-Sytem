const mongoose = require('mongoose')

const Schema = mongoose.Schema

const supplierOrderSchema = new Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    supname: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unitcost: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    orderdate: {
        type: Date,
        default: Date.now,
    },
    duedate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    
})

module.exports = mongoose.model('SupplierOrder', supplierOrderSchema)