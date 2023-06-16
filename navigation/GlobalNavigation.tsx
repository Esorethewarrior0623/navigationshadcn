 // navigation/GlobalNavigation.tsx

 import { NavigationContainer } from "@react-navigation/native";
 import { createStackNavigator } from "@react-navigation/stack";
 import React from "react";
 import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
 import HomeScreen from "../screens/HomeScreen";
 import LoginScreen from "../screens/LoginScreen";
 import RegisterScreen from "../screens/RegisterScreen";
 import { useSupabase } from "../src/context/useSupabase";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/SettingsScreen";
import {createNativeStackNavigator } from "@react-navigation/native-stack"
import {Ionicons} from "@expo/vector-icons"
import BusinessDetailsScreen from "../screens/BusinessDetailsScreen";
 const Stack = createStackNavigator();
 const Tab = createBottomTabNavigator();

 //Homestack
 const HomeStack = createNativeStackNavigator();

 function HomeStackGroup() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='Home' component={HomeScreen}/>
            <HomeStack.Screen name='BusinessDetails' component={BusinessDetailsScreen} />
        </HomeStack.Navigator>
    )
 }

 const GlobalNavigation = () => {
   // We check if the user is logged in
   const { isLoggedIn } = useSupabase();

   return (
     <NavigationContainer>
       
         {/* Only authenticated users can access the home */}
         {isLoggedIn ? (
           <Tab.Navigator screenOptions={({route, navigation}) => ({
            tabBarIcon: ({color, focused, size}) => {
                let iconName: "home" | "home-outline" | "settings" | "ios-settings-sharp" = "home-outline";
                if (route.name === "HomeStackGroup") {
                    iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Settings") {
                    iconName = focused ? "settings" : "ios-settings-sharp"
                }
                return <Ionicons  size={size} color={color} name={iconName}/>
            } ,
            tabBarActiveTintColor: "#1DA1F2",
            tabBarInactiveTintColor: "grey"
           })}>
                <Tab.Screen name="HomeStackGroup" component={HomeStackGroup} 
                    options={{headerShown: false, tabBarLabel: "Home"}} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
           
         ) : (
            <Stack.Navigator
            initialRouteName={isLoggedIn ? "Home" : "Login"}
            screenOptions={{ headerShown: false }}
          >
             <Stack.Screen name="Login" component={LoginScreen} />
             <Stack.Screen name="Register" component={RegisterScreen} />
             <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
           </Stack.Navigator>
         )}
       
     </NavigationContainer>
   );
 };

 export default GlobalNavigation;
