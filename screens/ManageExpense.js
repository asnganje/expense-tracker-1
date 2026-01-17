import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId 

  useLayoutEffect(()=> {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense" 
    })
  }, [navigation, isEditing])
  
  return(
    <View>
      <Text>Expense Management</Text>
    </View>
  )
  
}

export default ManageExpense;