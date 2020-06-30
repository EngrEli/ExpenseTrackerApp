import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "./store";
import swal from "sweetalert"
import Home from "./components/Home"
import{
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom"
import "./app.css"

export default class App extends Component {
    componentDidMount(){
        swal({
            title:"Welcome To Expense Tracker App!",
            text: "Expense Tracker App is a MERN app I made a couple of months ago. I studied a little bit of backend with the help of MongoDB and Node JS. This helped me accomplished this simple app which basically just computes the balance by adding incomes and subtracting expenses to the starting balance. The user can also create multiple accounts with different starting budgets. Studying backend development , compared to front-end , is a pain but I somehow managed to finished this app and put some tweaks in my code.   ",
            icon:"info",
            button: "Next"
        }).then(()=>{
            swal({
                title:"The reason I created this app?",
                text: "I want to emphasize my understanding on React JS especially on conditional rendering and state management using Redux and local states. I also used some Javascript array methods like .map , .filter and .reduce which is very useful when it comes to set of data. I also made a simple design which is neat and minimal for the user.Lastly, I demonstrated how can I use different CSS frameworks and CSS principles to create a single page app. ",
                icon:"success",
                button: "Proceed to the App"
            })
        })
        
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Provider store={store}>
                        <Route exact path="/" component={Home}/>
                    </Provider>
                </Switch>
            </BrowserRouter>

        )
    }
}
// {/* 
// //  // <Router>
// //  <Provider store={store}> */}
//  {/* <Switch> */}
//       {/* <Route path="/" exact component={Home}/> */}
//       {/* <Route path="/" exact component={AccountForm}/> */}
//       {/* <Route path="/account" exact component={accountList}/> */}
//   {/* </Switch> */}
// {/* // </Provider> */}
// // {/* </Router> */}