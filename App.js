import React from "react";
import LoginScreen from "./app/screens/LoginScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import HomeScreen from "./app/screens/HomeScreen";
import CourtsList from "./app/components/Test";
import Screen from "./app/components/Screen";

export default function App() {
  return (
    <Screen>
      <CourtsList></CourtsList>
    </Screen>
  );
}
