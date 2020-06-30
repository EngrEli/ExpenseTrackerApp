// reducer is where the state would come from

const initState={
    income: []
}
const incomeReducer = (state= initState, action)=>{
    switch(action.type){
        case "GET_INCOMES":
            return {
                ...state,
                income: action.payload,
            }
        case "ADD_INCOME":
            return {
                ...state,
                income: [action.payload, ...state.income]
            }
        case "DELETE_INCOME": 
            return {
                ...state,
                income: state.income.filter( income => income._id !== action.payload)
            }
        default: 
            return state
    }
}
export default incomeReducer