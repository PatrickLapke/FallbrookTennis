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
import MyBookingsScreen from "./app/screens/MyBookingsScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Password Reset" component={PasswordResetScreen} />
    <Stack.Screen name="New Password" component={NewPasswordScreen} />
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Tennis Court Booking" component={TennisBookingScreen} />
    <Stack.Screen
      name="Pickleball Court Booking"
      component={PickleballBookingScreen}
    />
    <Stack.Screen name="My Bookings" component={MyBookingsScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator></StackNavigator>
    </NavigationContainer>
  );
}
