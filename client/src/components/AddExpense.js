import React, { Component } from 'react'
import { connect } from "react-redux"
import { addExpense } from "../actions"
import {
    Button,
    Input
} from "reactstrap"
import swal from "sweetalert"

class AddExpense extends Component {
    state={
        // showAddTransactionForm: false,
        category: [
            "Clothing",
            "Education",
            "Food and Drink",
            "HealthCare",
            "Transportation",
            "Extra",
            "Shopping"
        ],
        description: "",
        categoryName:"Clothing",
        amount:"",
        descriptionError:"",
        amountError:""
    }
    // for description and amount input
    handleInputChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleAmountChange = (e)=>{
        this.setState({
            amount: e.target.value,
        })
    }
    handleCategoryChange = (e)=>{
        this.setState({
            categoryName: e.target.value
        })
    }
    // ======= =============================================
    validate=()=>{
        let descriptionError = ""
        let amountError     = ""
        // description error
        if(!this.state.description){
            descriptionError = true
        }
        if(descriptionError){
            return false
        }
        // amount error handling
        if(!this.state.amount){
            amountError= true
        }
        if(this.state.amount<=0){
            amountError = true
        }
        if(amountError){
            return false
        }

        return true
    }
    // ====================================================
    handleCreateExpenseSubmit = (e)=>{
        e.preventDefault()

        const isValid = this.validate();

        if(isValid){
            const newExpense = {
                description: this.state.description,
                category:   this.state.categoryName,
                amount:     this.state.amount,
                account:    this.props.accountName
            }
            this.props.addExpense(newExpense)
            console.log(newExpense)
            swal({
                title: "Successful!",
                text:"A new expense has been created!",
                icon:"success",
                timer:1000,
                buttons:false
            })
            this.setState({
                description:"",
                amount:"",
                showAddTransactionForm: false,
            })
        }else{
            swal("Error!", "Don't leave the form blank  |  Negative amounts are invalid", "error")
        }
    }
    render() {
        const {category,amount, description} = this.state

        return (
            <>  
                <h1>Add Expense</h1>
                <form style={{ display:"flex", flexDirection: "column"}}>
                    Description
                    <Input 
                        type="name" 
                        required 
                        name="description"
                        value={description}
                        onChange={this.handleInputChange}
                        autoFocus={true}
                    />
                    Category
                    <Input 
                        type="select" 
                        required 
                        name="category"
                        onChange={this.handleCategoryChange}
                    >   
                        {category.map((items,index)=>{
                            return (
                                <option key={index} value={items}>{items}</option>
                            )
                        })}
                    </Input>
                    Amount
                    <Input 
                        type="number" 
                        required 
                        value={amount}
                        name="amount"
                        onChange={this.handleAmountChange}
                    />
                    {/* --------- */}
                    <Button 
                        type="submit"
                        className="margin-top-bot" 
                        onClick={this.handleCreateExpenseSubmit}
                        >Submit<i style={{marginLeft:"7px"}} className="angle double right icon"></i>
                    </Button>
                    <Button 
                        onClick={this.props.handleHideAddExpense} 
                        className="margin-top-bot" 
                        > Cancel
                    </Button> 
                </form> 
            </>
        )
    }
}

export default connect(null, {addExpense})(AddExpense)