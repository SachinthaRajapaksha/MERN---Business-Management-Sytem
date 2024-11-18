const mongoose = require('mongoose')

const Schema = mongoose.Schema

const incomeSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
      },
    detail: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: { 
        type: String,
        required: true
    },
    type: { 
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Income', incomeSchema) //automatically collection ekak hdnawa