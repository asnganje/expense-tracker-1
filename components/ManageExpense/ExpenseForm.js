import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";

function ExpenseForm() {

  function amountChangeHandler () {}

  return(
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input 
          label="Amount"
          style={[styles.sharedInputStyle]}
          textInputConfig={{
            keyboardType:"decimal-pad",
            onChangeText: amountChangeHandler,
          }}
        />
        <Input 
          label="Date"
          style={[styles.sharedInputStyle]}
          textInputConfig={{
            placeholder:"YYYY-MM-DD",
            maxLength:10,
            onChangeText:()=>{}
          }}
        />
        </View>
      <Input label="Description"
        textInputConfig={{
          multiline: true,
          numberOfLines:5,
        }}
      />
    </View>
  )
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form:{
    marginTop:80
  },
  title:{
    fontSize:24,
    fontWeight:"bold",
    color:"white",
    marginVertical:24,
    textAlign:"center"
  },
  inputsRow:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  sharedInputStyle:{
    flex:1,
    minWidth:"50%"
  }
})