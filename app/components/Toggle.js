import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "./AppButton";

import colors from "../config/colors";

function Toggle({ isSingles, setIsSingles }) {
  return (
    <View style={styles.container}>
      <AppButton
        width="40%"
        color={isSingles ? "primary" : "light"}
        title={"Singles"}
        onPress={() => setIsSingles(true)}
        textColor={isSingles ? "white" : "black"}
      />
      <AppButton
        width="40%"
        color={isSingles === false ? "primary" : "light"}
        title={"Doubles"}
        onPress={() => setIsSingles(false)}
        textColor={isSingles === false ? "white" : "black"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selected: { backgroundColor: colors.primary },
});

export default Toggle;
