import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";

function AppButton({
  title,
  color = "primary",
  onPress,
  width = "100%",
  textColor = "white",
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color], width }]}
      onPress={onPress}
    >
      <AppText style={[styles.text, { color: colors[textColor] }]}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 25,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
    padding: 15,
  },
  text: {
    color: colors.white,
  },
});

export default AppButton;
