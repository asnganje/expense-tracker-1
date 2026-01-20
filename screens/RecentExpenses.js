import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpense() {
  const expensesCtx = useContext(ExpensesContext)
  const [ isFetching, setIsFetching ] = useState(true)
  const [error, setError] = useState()

  useEffect(()=> {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses()
        expensesCtx.setExpenses(expenses)
      } catch (error) {
        setError("Could not fetch expenses!")
      }
      setIsFetching(false)
    }
    getExpenses()
  }, [])

  const recentExpenses = expensesCtx.expenses.filter((expense)=> {
    const today = new Date()
    const date7daysAgo = getDateMinusDays(today, 7)
    return expense.date > date7daysAgo
  })

  function errorHandler() {
    setError(null)
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  return( <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days"/>)
  
}

export default RecentExpense;