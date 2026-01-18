import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id:"e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2023-12-19")
  },
  {
    id:"e2",
    description: "A pair of trousers",
    amount: 12.01,
    date: new Date("2023-02-23")
  },
  {
    id:"e3",
    description: "Bananas",
    amount: 34.34,
    date: new Date("2024-08-14")
  },
  {
    id:"e4",
    description: "A book",
    amount: 100.00,
    date: new Date("2025-12-23")
  },
  {
    id:"e5",
    description: "Fish",
    amount: 205.50,
    date: new Date("2026-01-15")
  }
]


export const ExpensesContext = createContext({
  expenses:[],
  addExpense:({description, date, amount})=>{},
  updateExpense:(id)=>{},
  deleteExpense:(id, {description, amount, date})=>{}
})

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString()+Math.random().toString()
      return [{id, ...action.payload}, ...state]
    case "UPDATE":
      const updatableIndex = state.findIndex((expense)=>expense.id === action.payload.id)
      const updatableExpense= state[updatableIndex]
      const updatedItem = {...updatableExpense, ...action.payload.data}
      const updatedExpenses = [...state]
      updatedExpenses[updatableIndex] = updatedItem
      return updatedExpenses
    case "DELETE":
      return state.filter((expense)=>expense.id !== action.payload)
    default:
      return state
  }
}


function ExpensesContextProvider({children}) {

  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

  function addExpense(expenseData) {
    dispatch({type:"ADD", payload: expenseData})
  }

  function deleteExpense(id) {
    dispatch({type:"DELETE", payload:id})
  }

  function updateExpense(id, expenseData) {
    dispatch({type:"UPDATE", payload: {id:id, data: expenseData}})
  }
  const value = {
    expenses: expensesState,
    addExpense: addExpense, 
    deleteExpense: deleteExpense, 
    updateExpense: updateExpense
  }
  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
export default ExpensesContextProvider;
