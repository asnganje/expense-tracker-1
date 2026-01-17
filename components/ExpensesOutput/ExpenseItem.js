import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles"
import { getFormattedDate } from "../../util/date";

function ExpenseItem({description, amount, date}) {
  return(
    <Pressable>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.description, styles.textBase]}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding:12,
    marginVertical:8,
    backgroundColor:GlobalStyles.colors.primary500,
    flexDirection:"row",
    justifyContent:"space-between",
    borderRadius:6,
    elevation:4
  },
  textBase: {
    color: GlobalStyles.colors.primary50
  },
  description: {
    fontSize:16,
    fontWeight:"bold",
    marginBottom:4
  },
  amountContainer:{
    paddingHorizontal:12,
    paddingVertical:4,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:4
  },
  amount:{
    color:GlobalStyles.colors.primary500,
    fontWeight:"bold"
  }
})