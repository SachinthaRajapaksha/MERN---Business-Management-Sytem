const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    
    dateOfOrder: {
        type: Date,
        default: Date.now,
      },
    detail: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
   
}) //when the codument is created,last updated

module.exports = mongoose.model('Order', orderSchema)