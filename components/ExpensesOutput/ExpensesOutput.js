import { FlatList, Text, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

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

function ExpensesOutput({expenses, expensesPeriod}) {
  return(
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES}/>
    </View>
  )  
}

export default ExpensesOutput;