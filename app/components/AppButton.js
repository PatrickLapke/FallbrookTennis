import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

function AppButton({ title, color = "primary", onPress, width = "100%" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color], width }]}
      onPress={onPress}
    >
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 25,
    justifyContent: "center",
    marginTop: 10,
    padding: 15,
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default AppButton;
