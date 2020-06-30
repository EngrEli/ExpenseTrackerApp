const express = require("express");
const router = express.Router()

const Account = require("../models/account.model");

// @route   GET /account
// @desc    Show the Accounts within the database
// @access  Public
router.get("/account",(req,res)=>{
    Account.find()
    // sort by the newest item entered being on the top
        .sort({ date: -1 })
        .then(account => res.json(account))
        .catch(err=> res.status(400).json(`Error: ${err}`))
})
// @route   POST /account
// @desc    Create an account 
// @access  Public
router.post("/account/add",  (req,res)=>{
    const {accountName, startingAmount } = req.body
    const newAccount = new Account({
        accountName,
        startingAmount
    })
    newAccount.save()
        .then((account) => res.json(account))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// @route   DELETE /account/:id
// @desc    Delete account
// @access  Public
router.delete("/account/:id",(req,res)=>{
    Account.findByIdAndDelete(req.params.id)
        .then(() => res.json("Account Deleted"))
        .catch(err=> res.status(400).json(`Error: ${err}`))
})

// @route   PUT /account/edit/:id
// @desc    update account
// @access  Public
router.put("/account/edit/:id", (req,res)=>{
    Account.findById(req.params.id)
        .then(account =>{
            const {accountName, startingAmount } = req.body
            account.accountName    =   accountName
            account.startingAmount =   startingAmount

            account.save()
                .then(() => res.json("Account Updated"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;