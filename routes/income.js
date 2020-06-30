const express = require("express");
const router = express.Router()

const Income = require("../models/income.model");

// @route   GET /income
// @desc    Show the income within the database
// @access  Public
router.get("/income",(req,res)=>{
    Income.find()
    // sort by the newest item entered being on the top
        .sort({ date: -1 })
        .then(income => res.json(income))
        .catch(err=> res.status(400).json(`Error: ${err}`))
})

// @route   GET /income/:id
// @desc    Show individual income by id
// @access  Public
router.get("/income/:id", (req,res)=>{
    Income.findById(req.params.id)
        .then(income => res.json(income))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// @route   POST /income
// @desc    Create an income
// @access  Public
router.post("/income/add",  (req,res)=>{
    const {description,amount, account} = req.body
    const newIncome = new Income({
        description,
        amount,
        account
    })
    
    newIncome.save()
        .then((income) => res.json(income))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// @route   DELETE /income/:id
// @desc    Delete expense
// @access  Public
router.delete("/income/:id",(req,res)=>{
    Income.findByIdAndDelete(req.params.id)
        .then(() => res.json("Income Deleted"))
        .catch(err=> res.status(400).json(`Error: ${err}`))
})

// @route   PUT /income/edit/:id
// @desc    update income
// @access  Public
router.put("/expense/edit/:id", (req,res)=>{
    Income.findById(req.params.id)
        .then(income =>{
            const {description,category,amount} = req.body
            income.description    =   description
            income.amount         =   amount
            income.account        =   req.body.account
            
            income.save()
                .then(() => res.json("Income Updated"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;