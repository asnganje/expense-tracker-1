import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) { 
  return <ExpenseItem {...itemData.item} />
}

function ExpensesList({expenses}) {
  
  if (expenses.length === 0) {
    return <View style={styles.container}>
      <Text style={styles.text}>You have no expenses at the moment!</Text>
    </View>
  }

  return <FlatList 
    data={expenses}
    renderItem={renderExpenseItem}
    keyExtractor={(item)=> item.id}
  />
}

export default ExpensesList;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  text:{
    color:"white",
  }
})