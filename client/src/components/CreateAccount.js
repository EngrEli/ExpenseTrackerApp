import React, { Component } from 'react'
import swal from "sweetalert"
import { addAccount } from "../actions"
import { connect } from "react-redux"
import {Spring} from "react-spring/renderprops"

import {
    Button,
    Input,
} from "reactstrap"

// const Form = ()=>{
//     return(
//         <Spring
//             from={{opacity: 0}}
//             to={{opacity:1}}
//         >
//             {props =>{
//                 <div style={props}>
//                     <div className="container-border"style={props} >
//                         <form style={{ display:"flex", flexDirection: "column"}}>
//                             Account Name
//                             <Input 
//                                 type="name" 
//                                 onChange={this.handleFormCreateState} 
//                                 value={this.state.accountName}
//                                 name="accountName"
//                             />
//                             <div className="error">{this.state.accountNameError}</div>
//                             Starting Amount
//                             <Input 
//                                 type="number" 
//                                 onChange={this.handleFormCreateState} 
//                                 value={this.state.startingAmount}
//                                 name="startingAmount"
//                             />
//                             <div className="error">{this.state.amountError}</div>
//                             <Button 
//                                 type="submit"
//                                 className="margin-top-bot" 
//                                 onClick={this.handleCreateAccountSubmit}
//                             >Submit<i style={{marginLeft:"7px"}} className="angle double right icon"></i>
//                             </Button>
//                             <Button 
//                                 onClick={this.handleHideCreateForm} 
//                                 className="margin-top-bot" 
//                                 > Cancel
//                             </Button> 
//                         </form>     
//                     </div>
//                 </div>
//             }}
//         </Spring>
//     )
// }

class CreateAccount extends Component {
    state={
        accountName:"",
        startingAmount:"",
        showCreateAccountForm : false,
        // for form validation
        accountNameError:"",
        amountError:""
    }
    // when Create account button is clicked, the account form will show
    handleShowCreate = ()=>{
        this.setState({
            showCreateAccountForm: true
        })
    }
    // when cancel button was clicked , the account form will be hidden
    handleHideCreateForm = ()=>{
        this.setState({
            showCreateAccountForm: false,
            accountName:"",
            startingAmount:""
        })
    }
    // save input value of Create account form to the state
    handleFormCreateState = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // ======= =============================================
    // validate account info
    validate=()=>{
        let accountNameError = ""
        let amountError     = ""
        // description error
        if(!this.state.accountName ){
            accountNameError = true
        }
        
        if(accountNameError){
            return false
        }
        // amount error handling
        if(!this.state.startingAmount || this.state.startingAmount === ""){
            amountError= true
        }
        if(this.state.startingAmount <= 0){
            amountError = true
        }
        if(amountError){
            return false
        }
        return true
    }
    // ====================================================
    // submit create account info
    handleCreateAccountSubmit = (e)=>{
        const isValid = this.validate()
        e.preventDefault()
        if(isValid){
            const {accountName, startingAmount }= this.state 
            const newAccount = {
                accountName,
                startingAmount
            }
            // console.log(newAccount)
            this.props.addAccount(newAccount)
            this.setState({
                accountName:"",
                startingAmount:"",
                showCreateAccountForm: false,
            })
            swal({
                title: "Successful!",
                text:"You Created an Account!",
                icon:"success",
                timer:1000,
                buttons:false
            })
        }else{
            swal("Error!", "Don't leave the form blank  |  Negative amounts are invalid", "error")
        }
    }

    render() {
        const createAccountForm =
        // spring animation
            <Spring 
                from={{opacity:0}}
                to={{opacity:1}}
                config={{duration:1400}}
            >
                {props=>(
                    <div className="container-border" style={props}>
                        <form style={{ display:"flex", flexDirection: "column"}}>
                            Account Name
                            <Input 
                                type="name" 
                                onChange={this.handleFormCreateState} 
                                value={this.state.accountName}
                                name="accountName"
                            />
                            <div className="error">{this.state.accountNameError}</div>
                            Starting Amount
                            <Input 
                                type="number" 
                                onChange={this.handleFormCreateState} 
                                value={this.state.startingAmount}
                                name="startingAmount"
                            />
                            <div className="error">{this.state.amountError}</div>
                            <Button 
                                type="submit"
                                className="margin-top-bot" 
                                onClick={this.handleCreateAccountSubmit}
                            >Submit<i style={{marginLeft:"7px"}} className="angle double right icon"></i>
                            </Button>
                            <Button 
                                onClick={this.handleHideCreateForm} 
                                className="margin-top-bot" 
                                > Cancel
                            </Button> 
                        </form> 
                    </div>
                )}
                
            </Spring>

        const { showCreateAccountForm } = this.state
            
        return (
            <>
                <div className="button-margin">
                    <button className="button-margin ui basic button" 
                        onClick={this.handleShowCreate} 
                        disabled={showCreateAccountForm}>
                            Create Account <i style={{marginLeft:"5px"}} 
                            className="user plus icon"></i>
                    </button>
                </div>
                {/* if clicked ,show form and then disable the button */}
                {showCreateAccountForm ? createAccountForm : null }
            </>
        )
    }
}
export default connect(null, {addAccount})(CreateAccount)