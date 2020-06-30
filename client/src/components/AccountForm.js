// import React, { Component } from 'react'
// import { connect } from "react-redux"
// import { getAccounts } from "../actions"
// import { 
//     FormGroup ,
//     Input,
//     Label
// } from "reactstrap";

// class AccountForm extends Component {
//     state={
//         accountName:""
//     }
//     componentDidMount(){
//         this.props.getAccounts()
//     }
//     handleInputChange = (e)=>{
//         this.setState({
//             accountName: e.target.value
//         })
//     }
//     render() {
//         const account = 
//             <div>
//                 <FormGroup>
//                     <Label for="select">Accounts</Label>
//                         {/* <Input
//                             type="select" 
//                             onChange={this.handleInputChange}
//                             value={this.state.accountName}
//                             required
//                             name="accountName"
//                         > */}
//                         <select className="ui fluid dropdown">
//                             {
//                                 this.props.accounts.account.map(expense=>{
//                                     return(
//                                         <option value={expense.accountName}>{expense.accountName}</option>
//                                     )
//                                 })
//                             }
//                         </select>
//                         {/* </Input>  */}

//                 </FormGroup>
//             </div>


//         return (
//             <div>
//                 <h1>This is the account form</h1>
//                 {account}
//             </div>
//         )
//     }
// }

// const mapStateToProps = state =>({
//     accounts : state.accountReducer
// })

// export default connect(mapStateToProps,{ getAccounts })(AccountForm)