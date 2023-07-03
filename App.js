import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterScreen from "./app/screens/RegisterScreen";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import TennisBookingScreen from "./app/screens/TennisBookingScreen";
import PickleballBookingScreen from "./app/screens/PickleballBookingScreen";
import PasswordResetScreen from "./app/screens/PasswordResetScreen";
import NewPasswordScreen from "./app/screens/NewPasswordScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Password-Reset"
      component={PasswordResetScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="NewPasswordScreen"
      component={NewPasswordScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="TennisBooking"
      component={TennisBookingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PickleballBooking"
      component={PickleballBookingScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator></StackNavigator>
    </NavigationContainer>
  );
}
