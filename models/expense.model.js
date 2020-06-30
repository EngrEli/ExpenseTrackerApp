const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    description:{
        type: String,
        required: true,
        trim: true
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    amount:{
        type: Number,
        required: true,
        trim: true
    },
    account:{
        type: String,
        required: true,
        trim: true
    }
},{timestamps: true})

module.exports = Expense = mongoose.model("expense", expenseSchema);
