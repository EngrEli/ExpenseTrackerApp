const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    accountName:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    startingAmount:{
        type: Number,
        required: true,
        trim: true
    },
    // for sorting date
    date: {
        type: Date,
        default: Date.now
    }
},{timestamps: true})

module.exports = Account = mongoose.model("account", accountSchema);
