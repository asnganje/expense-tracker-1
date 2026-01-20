import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId 
  const expensesCtx = useContext(ExpensesContext)

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const selectedExpense = expensesCtx.expenses.find((expense)=>expense.id === editedExpenseId)
  
  useLayoutEffect(()=> {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense" 
    })
  }, [navigation, isEditing])

  async function deleteExpenseHandler() {
    setLoading(true)
    try {
      await deleteExpense(editedExpenseId)
      expensesCtx.deleteExpense(editedExpenseId)
      navigation.goBack()
    } catch (error) {
      setError("Could not delete the expense")
    }
    setLoading(false)
  }

  function cancelHandler() {
    navigation.goBack()
  }

  async function confirmHandler(expenseData) {
    setLoading(true)
    try {
        if (isEditing) {
          expensesCtx.updateExpense(editedExpenseId,expenseData)
          await updateExpense(editedExpenseId, expenseData)
        } else {
          const id = await storeExpense(expenseData)
          expensesCtx.addExpense({...expenseData, id})
        }
        navigation.goBack()
    } catch (error) {
      setError("Could not save data - Please try again later!")
    }
    setLoading(false)
  }

  function errorHandler() {
    setError(null)
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if (loading) {
    return <LoadingOverlay />
  }
  
  return(
    <View style={styles.container}>
      <ExpenseForm 
        onCancel={cancelHandler} 
        isEditing={isEditing} 
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing? "Update" : "Add"}
        defaultValues ={selectedExpense}
      />
      {isEditing && 
      <View style={styles.deleteContainer}>
        <IconButton icon="trash" size={32} color={GlobalStyles.colors.error500} onPress={deleteExpenseHandler} />
      </View>
      }
    </View>
  )
  
}

export default ManageExpense;

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    backgroundColor:GlobalStyles.colors.primary800
  },
  deleteContainer:{
    marginTop:16,
    paddingTop:8,
    borderTopWidth:2,
    borderTopColor:GlobalStyles.colors.primary200,
    alignItems:"center"
  }
})