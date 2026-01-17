import { Ionicons } from "@expo/vector-icons"
import { Pressable, StyleSheet, View } from "react-native";

function IconButton({icon, size, color, onPress}) {
  return <Pressable onPress={onPress}
  android_ripple={{color:"#cccccc"}}
    style={
      ({pressed})=> pressed ? styles.pressed : null
    }
  >
    <View style={styles.buttonContainer}>
      <Ionicons name={icon} size={size} color={color}/>
    </View>
  </Pressable>
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer:{
    borderRadius:24,
    padding:6,
    marginHorizontal:8,
    marginVertical:2
  },
  pressed:{
    opacity:0.5
  }
})