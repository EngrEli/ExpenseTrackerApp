import React, { Component } from 'react'
import { connect } from "react-redux"
import { addIncome } from "../actions"
import {
    Button,
    Input
} from "reactstrap"
import swal from "sweetalert"
const initState = {
    description: "",
    amount:"",
    descriptionError: "",
    amountError:""
}
class AddIncome extends Component {
    state = initState

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
            this.setState({ descriptionError})
            return false
        }
        
        // amount error handling
        if(!this.state.amount){
            amountError = true
        }
        if(this.state.amount<=0){
            amountError = true
        }
        // if(this.state.amount <= 0 ){
        //     amountError= "Invalid amount , please enter a positive amount for income"
        // }
        if(amountError){
            this.setState({amountError})
            return false
        }

        return true
    }
    // ====================================================

    handleCreateIncomeSubmit = (e)=>{
        e.preventDefault()

        const isValid = this.validate();

        if(isValid){
            const newIncome = {
                description: this.state.description.trim(),
                amount:     this.state.amount,
                account:    this.props.accountName
            }
            this.props.addIncome(newIncome)
            console.log(newIncome)
            this.setState(initState)
            swal({
                title: "Successful!",
                text:"A new income has been created!",
                icon:"success",
                timer:1000,
                buttons:false
            })
        }else{
            swal("Error!", "Don't leave the form blank  |  Negative amounts are invalid", "error")
        }
    }

    render() {
        const {amount, description} = this.state
        return (
            <>  
                <h1>Add Income</h1>
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
                    {/* --------- */}
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
                        onClick={this.handleCreateIncomeSubmit}
                        >Submit<i style={{marginLeft:"7px"}} className="angle double right icon"></i>
                    </Button>
                    {/* --------- */}
                    <Button 
                        onClick={this.props.handleHideAddIncome} 
                        className="margin-top-bot" 
                        > Cancel
                    </Button> 
                </form> 
            </>
        )
    }
}

export default connect(null, {addIncome})(AddIncome)