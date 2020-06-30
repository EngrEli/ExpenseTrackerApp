import React, { Component } from 'react'
import { 
    getAccounts , 
    itemsLoading,deleteAccount , 
    getExpenses, 
    deleteExpense, 
    getIncomes,
    deleteIncome
} from "../actions"
import AddTransaction from "./AddTransaction"
import { connect } from "react-redux"
import swal from "sweetalert"
import {
    Button,
    Input,
    FormGroup,
    Label
} from "reactstrap"

class ShowAccount extends Component {
    // ==================================================================
    state={
        showAccounts   : false,
        account:"",
        showAddExpense: false,
        showAddIncome: false
    }
    // ==================================================================
    componentDidMount(){
        // when the component renders and the accounts are not fetched
        // loading data
        this.props.itemsLoading()
        
        // this props will load accounts and expenses at the render
        this.props.getAccounts();
        // get income
        this.props.getIncomes();
        // get expenses
        this.props.getExpenses();
        // i cant console.log data from the reducer
        // console.log(`accounts : ${this.props.accounts.account}`)
    }
    // ==================================================================
    handleShowAccounts = ()=>{
        this.setState({
            showAccounts:true
        })
    }
    // ==================================================================
    // when selecting an item on a select input , changes the state also
    handleAccountChange = (e)=>{
        this.setState({
            account: e.target.value
        })
    }
    // ==================================================================
    // close the show account component
    handleHideAccountData = ()=>{
        this.setState({
            showAccounts:false,
            account:""
        })
    }
    // ==================================================================
    // delete the account
    delete =(id)=>{
        // from sweetalert package
        return swal({
            title: "Are you sure?",
            text:"Once deleted, you will not be able to recover it anymore",
            icon: "warning", 
            buttons: true,
            dangerMode: true
        })
        .then(willDelete=>{
            if(willDelete){
                // delete the data in the database
                this.props.deleteAccount(id)
                this.setState({
                    account:""
                })
                swal("Account has been deleted!",{icon:"success",buttons:false,timer:1000})
            }
            else{
                swal("Account remains")
            }
        })
    }
    // ==================================================================
    handleDeleteExpense = (id)=>{
        // from sweetalert package
        return swal({
            title: "Are you sure?",
            text:"Once deleted, you will not be able to recover it anymore",
            icon: "warning", 
            buttons: true,
            dangerMode: true
        })
        .then(willDelete=>{
            if(willDelete){
                // delete the data in the database
                this.props.deleteExpense(id)
                swal("Expense has been deleted!",{icon:"success",buttons:false,timer:1000})
            }
            else{
                swal("Expense remains")
            }
        })
    }
    // ==================================================================
    handleDeleteIncome = (id)=>{
        // from sweetalert package
        return swal({
            title: "Are you sure?",
            text:"Once deleted, you will not be able to recover it anymore",
            icon: "warning", 
            buttons: true,
            dangerMode: true
        })
        .then(willDelete=>{
            if(willDelete){
                // delete the data in the database
                this.props.deleteIncome(id)
                swal("Income has been deleted!",{icon:"success",buttons:false,timer:1000})
            }
            else{
                swal("Income remains")
            }
        })
    }
    // ==================================================================
    // ===============================
    // handleShowAddExpense
    handleShowAddExpense = ()=>{
        this.setState({
            showAddExpense: true,
            showAddIncome: false
        })
    }
    handleHideAddExpense = ()=>{
        this.setState({
            showAddExpense: false
        })
    }
    // ===============================
    // ===============================
    // handleShowAddIncome
    handleShowAddIncome = ()=>{
        this.setState({
            showAddIncome: true,
            showAddExpense: false
        })
        console.log("clicked")
    }
    handleHideAddIncome =()=>{
        this.setState({
            showAddIncome: false
        })
    }
    // ===============================
    render() {
        
        // ==================================================================
        // displays the expenses under an account
        const expenseDisplay = 
        // i destructured it 
            this.props.expenses.expense.map(({description, _id, amount, account, category})=>{
                // when account inside the global state is the same with the internal state account
                return account === this.state.account &&
                <>
                    <div key={_id }>
                        <div style={{float:"right",marginLeft:"25px"}}className="ui animated negative button mini" tabIndex="0">
                            <div className="visible content">Delete</div>
                            <div className="hidden content" onClick={this.handleDeleteExpense.bind(this,_id)}>
                                <i className="trash alternate outline icon"></i>
                            </div>
                        </div>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div className="heading">{description}</div> 
                            <div style={{color:"red"}}>-P{amount}</div>
                            <div style={{color:"gray"}}>{category}</div>
                        </div>
                    </div>
                    <br/>
                </>
        })
        // ==================================================================
        // all income display from a single account
        const incomeDisplay = 
            this.props.incomes.income.map(({description,_id, account,amount, category})=>{
                return account === this.state.account && 
                    <div key={_id}>
                        <div style={{float:"right", marginLeft:"25px"}}className="ui animated negative button mini" tabIndex="0">
                            <div className="visible content">Delete</div>
                            <div className="hidden content" onClick={this.handleDeleteIncome.bind(this,_id)}>
                                <i className="trash alternate outline icon"></i>
                            </div>
                        </div>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div className="heading">{description}</div> 
                            <div style={{color:"green"}}>+P{amount}</div>
                        </div>
                    </div>
            })
        // ==================================================================
        // all expenses added inside a single account
        const totalExpense = 
            this.props.expenses.expense
            .filter(expense=> {
                return expense.account === this.state.account
                })
            .map(item=>item.amount)
            .reduce((acc,init)=> acc+init,0)
        
        const totalIncome =
            this.props.incomes.income
            .filter(income=>{
                return income.account === this.state.account
            })
            .map(item => item.amount)
            .reduce((acc, initVal)=> acc+initVal , 0)
        // ==================================================================
        // form for accounts 
        const showAccountData = 
                <FormGroup className="container-border" >
                    <Label for="select">Accounts</Label>
                        <Input
                            type="select" 
                            // change  the handle change event handler
                            onChange={this.handleAccountChange}
                            value={this.state.account}
                            required
                            name="account"
                        >
                            <option value="" disabled={true}>Select Account</option>
                        {
                            this.props.accounts.account.map(items=>{
                                // deconstruct
                                const {_id, accountName} = items
                                return(
                                    <option key={_id}  value={accountName}>{accountName}</option>
                                )
                            })
                        }
                    </Input> 
                    {/* if the input on the select is the same with the state , output the detail of the account */}
                    {
                    this.props.accounts.account.map(items=>{
                        const {_id, startingAmount, accountName} = items
                        return items.accountName === this.state.account &&
                            // deconstruct
                            (
                            <div key={_id} style={{marginTop:"5px"}}>
                                <p>Account Name:<span style={{float:"right"}}>{accountName}</span></p> 
                                <p>Starting Amount:<span style={{float:"right"}}>{startingAmount}</span></p> 
                                {/* i am getting the balance because i subtract starting amount to the reduced expense that is found in the expense */}
                                {/* the color of the balance will be red if negative , green if positive */}
                                <p>Balance:<span style={{color: startingAmount - totalExpense +totalIncome<= 0 ? "red": "rgb(47, 151, 47)", float:"right"}}>{startingAmount - totalExpense + totalIncome}</span></p> 
                                {/* delete the account permanently */}
                                <div className="ui animated negative button mini" tabIndex="0">
                                    <div className="visible content">Delete Account</div>
                                    <div className="hidden content" onClick={this.delete.bind(this,_id)}>
                                        <i className="user times icon"></i>
                                    </div>
                                </div>
                                {/* if the account on the expense reducer matches the account state here,
                                the expenses saved on the account's name will be displayed under his/her name only */}
                                <hr/>
                                <h1 style={{textAlign: "center"}}>Transactions</h1>
                                {/* this is the list of transactions under the name that matches the input select */}
                                <h4 style={{color:"red" , border:"1px dashed red", padding:"10px", textAlign:"center"}}>Expense </h4> 
                                {expenseDisplay}
                                <h4 style={{color:"green" , border:"1px dashed green", padding:"10px",  textAlign:"center"}}>Income </h4>
                                {incomeDisplay}
                                {/* i passed accountName state as a props. This is to be used for sending post to add transaction */}
                                <br/>
                                <br/>
                                <AddTransaction accountName={accountName} />
                            </div>
                            )
                        })
                    }
                    <Button className="button-margin" onClick={this.handleHideAccountData}>Close</Button>
                </FormGroup>
         // ==================================================================

        const { showAccounts } = this.state
        return (
            <>
                <div className="button-margin">
                    <button className="ui basic button" onClick={this.handleShowAccounts} disabled={showAccounts}>Select Account <i style={{marginLeft:"5px"}} className="users icon"></i></button> 
                </div>
                {/* if clicked ,show form and then disable the button */}
                {showAccounts? showAccountData : null}
            </>
        )
    }
}
const mapStateToProps = state =>({
    accounts: state.accountReducer,
    expenses: state.expenseReducer,
    incomes:  state.incomeReducer
})

export default connect(mapStateToProps,{itemsLoading, getAccounts,deleteAccount,getExpenses, deleteExpense, getIncomes,deleteIncome})(ShowAccount)