// reducer is where the state would come from

const initState={
    expense: []
}
const expenseReducer = (state= initState, action)=>{
    switch(action.type){
        case "GET_EXPENSES":
            return {
                ...state,
                expense: action.payload,
            }
        case "ADD_EXPENSE":
            return {
                ...state,
                expense: [action.payload, ...state.expense]
            }
        case "DELETE_EXPENSE": 
            return {
                ...state,
                expense: state.expense.filter( expense => expense._id !== action.payload)
            }
        default: 
            return state
    }
}
export default expenseReducer