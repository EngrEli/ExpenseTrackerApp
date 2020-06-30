import axios from "axios"

export const getAccounts = () => dispatch =>{
    axios
        .get("/account")
        .then(res =>
            dispatch({
                type: "GET_ACCOUNTS",
                // res.data is coming from the data on the routes/api 
                payload: res.data
            })
        )
}

export const itemsLoading = ()=>({
    type: "ITEMS_LOADING"
})

export const addAccount = input => dispatch =>{
    axios
        .post("/account/add", input)
        .then(res =>
            dispatch({
                type: "ADD_ACCOUNT",
                // res.data is coming from the data on the routes/api 
                payload: res.data
            })
        )
}

export const deleteAccount = id => dispatch =>{
    axios
        .delete(`/account/${id}`)
        .then(res=>
            dispatch({
                type:"DELETE_ACCOUNT",
                payload: id
            })    
        )
}
// ===============================================
// EXPENSES
export const addExpense = input => dispatch =>{
    axios
        .post("/expense/add", input)
        .then(res=>
            dispatch({
                type:"ADD_EXPENSE",
                payload: res.data
            })    
        )
}
export const getExpenses = () => dispatch =>{
    axios
        .get("/expense")
        .then(res =>
            dispatch({
                type: "GET_EXPENSES",
                // res.data is coming from the data on the routes/api 
                payload: res.data
            })
        )
}

export const deleteExpense = (id) =>dispatch=>{
    axios  
        .delete(`/expense/${id}`)
        .then(res=>
            dispatch({
                type: "DELETE_EXPENSE",
                payload:id
            })
        )
}

// ===============================================

// INCOME 
export const getIncomes = ()=> dispatch =>{
    axios
        .get("/income")
        .then(res=>{
            dispatch({
                type:"GET_INCOMES",
                payload: res.data
            })
        })
}
export const addIncome = (income)=> dispatch =>{
    axios
        .post("/income/add" , income)
        .then(res=>{
            dispatch({
                type:"ADD_INCOME",
                payload: res.data
            })
        })
}
export const deleteIncome = (id)=> dispatch=>{
    axios
        .delete(`/income/${id}`)
        .then(res=>{
            dispatch({
                type: "DELETE_INCOME",
                payload: id
            })
        })
}