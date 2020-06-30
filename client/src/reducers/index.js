import { combineReducers } from "redux"
import accountReducer from "./accountReducer"
import expenseReducer from "./expenseReducer"
import incomeReducer  from "./incomeReducer"

export default combineReducers({
    accountReducer,
    expenseReducer,
    incomeReducer
})
