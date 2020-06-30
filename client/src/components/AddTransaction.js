import React, { Component } from 'react'
import AddExpense from "./AddExpense"
import AddIncome  from "./AddIncome"

export default class AddTransaction extends Component {
    state={
        showAddExpense: false,
        showAddIncome: false
    }
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
    }
    handleHideAddIncome =()=>{
        this.setState({
            showAddIncome: false
        })
    }
    // ===============================
    render() {
        return (
            <div style={{border:"none", borderTop:"1px solid black", paddingTop:"15px"}}>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <div className="ui animated negative button mini" tabIndex="0" >
                        <div className="visible content">Add Expense</div>
                        <div className="hidden content" onClick={this.handleShowAddExpense}>
                            <i className="plus circle icon"  ></i>
                        </div>
                    </div>
                    <div className="ui animated positive button mini" tabIndex="0">
                        <div className="visible content">Add Income</div>
                        <div className="hidden content" onClick={this.handleShowAddIncome}>
                            <i className="plus circle icon"  ></i>
                        </div>
                    </div>
                </div> 
                {
                    this.state.showAddIncome?
                        <AddIncome
                            accountName={this.props.accountName} 
                            handleHideAddIncome={this.handleHideAddIncome}
                        />  :
                        null
                }
                 {
                    this.state.showAddExpense? 
                        <AddExpense 
                            accountName={this.props.accountName} 
                            // i passed in hideprops for the form to be closed
                            handleHideAddExpense={this.handleHideAddExpense}
                        /> : 
                        null
                }
            </div>
        )
    }
}

