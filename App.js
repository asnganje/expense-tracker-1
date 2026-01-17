import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import ManageExpense from "./screens/ManageExpense"
import RecentExpenses from "./screens/RecentExpenses"
import AllExpenses from "./screens/AllExpenses"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from "./constants/styles"
import {Ionicons} from "@expo/vector-icons"
import IconButton from './components/UI/IconButton';

const Stack = createNativeStackNavigator()

const BottomTabs = createBottomTabNavigator()

function ExpensesOverview({ navigation }) {
  return <BottomTabs.Navigator screenOptions={{
    headerStyle:{
      backgroundColor: GlobalStyles.colors.primary500,
    },
    headerTintColor:"white",
    tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500 },
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight:({tintColor})=><IconButton 
    color={tintColor} 
    icon="add" size={32}
    onPress={()=>navigation.navigate("ManageExpense")}
    />
  }}>
    <BottomTabs.Screen 
      name="RecentExpenses" 
      component={RecentExpenses}
      options={{
        title: "Recent Expenses",
        tabBarLabel:"Recent",
        tabBarIcon:({size, color})=> (<Ionicons name="hourglass" size={size} color={color} />)
      }}
    />
    <BottomTabs.Screen
      name="AllExpenses" 
      component={AllExpenses}
      options={{
        title:"All Expenses",
        tabBarLabel:"All",
        tabBarIcon:({size, color})=> (<Ionicons name="calendar" size={size} color={color}/>)
      }}
    />
  </BottomTabs.Navigator>  
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500
            },
            headerTintColor:"white"
          }}
        >
          <Stack.Screen 
            name="Expenses Overview" 
            component= {ExpensesOverview}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="ManageExpense" 
            component= {ManageExpense}
            options={{
              presentation:"modal"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


