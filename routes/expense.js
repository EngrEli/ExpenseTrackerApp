const express = require("express");
const router = express.Router()

const Expense = require("../models/expense.model");

// @route   GET /expense
// @desc    Show the Expenses within the database
// @access  Public
router.get("/expense",(req,res)=>{
    Expense.find()
    // sort by the newest item entered being on the top
        .sort({ date: -1 })
        .then(expense => res.json(expense))
        .catch(err=> res.status(400).json(`Error: ${err}`))
})

// @route   GET /expense/:id
// @desc    Show individual expenses by id
// @access  Public
router.get("/expense/:id", (req,res)=>{
    Expense.findById(req.params.id)
        .then(expense => res.json(expense))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// @route   POST /expense
// @desc    Create an expense
// @access  Public
router.post("/expense/add",  (req,res)=>{
    const {description,category,amount, account} = req.body
    const newExpense = new Expense({
        description,
        category,
        amount,
        account
    })
    
    newExpense.save()
        .then((expense) => res.json(expense))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// @route   DELETE /expense/:id
// @desc    Delete expense
// @access  Public
router.delete("/expense/:id",(req,res)=>{
    Expense.findByIdAndDelete(req.params.id)
        .then(() => res.json("Expense Deleted"))
        .catch(err=> res.status(400).json(`Error: ${err}`))
})

// @route   PUT /expense/edit/:id
// @desc    update expense
// @access  Public
router.put("/expense/edit/:id", (req,res)=>{
    Expense.findById(req.params.id)
        .then(expense =>{
            const {description,category,amount,date} = req.body
            expense.description    =   description
            expense.category       =   category
            expense.amount         =   amount
            expense.account        =   req.body.account
            
            expense.save()
                .then(() => res.json("Expense Updated"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;