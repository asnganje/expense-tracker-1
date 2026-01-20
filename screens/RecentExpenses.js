import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpense() {
  const expensesCtx = useContext(ExpensesContext)

  useEffect(()=> {
    async function getExpenses() {
      const expenses = await fetchExpenses()
      expensesCtx.setExpenses(expenses)
    }
    getExpenses()
  }, [])

  const recentExpenses = expensesCtx.expenses.filter((expense)=> {
    const today = new Date()
    const date7daysAgo = getDateMinusDays(today, 7)
    return expense.date > date7daysAgo
  })
  return( <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days"/>)
  
}

export default RecentExpense;