// reducer is where the state would come from

const initState={
    account: [],
    // this is for loading purposes
    isLoading: null,
}
const accountReducer = (state= initState, action)=>{
    switch(action.type){
        case "GET_ACCOUNTS":
            return {
                ...state,
                account: action.payload,
                isLoading: false
            }
        case "ADD_ACCOUNT":
            return {
                ...state,
                account: [...state.account, action.payload]
            }
        case "DELETE_ACCOUNT":
            return{
                ...state,
                account: state.account.filter(accounts=> accounts._id !== action.payload)
            }
        case "ITEMS_LOADING":
            return{
                ...state,
                isLoading: true
            }
        default: 
            return state
    }
}
export default accountReducer