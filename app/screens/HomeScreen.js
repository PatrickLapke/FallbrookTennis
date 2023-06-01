import React from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../components/AppButton";
import Screen from "../components/Screen";

function HomeScreen(props) {
  return (
    <Screen style={styles.container}>
      <AppButton title="Book a Tennis Court" color="secondary" />
      <AppButton title="Book a Pickleball Court" />
      <AppButton title="Vote on the GOAT" color="medium" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
});

export default HomeScreen;
