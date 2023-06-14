import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function PickerItem({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AppText style={styles.text}>{label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
  text: {
    padding: 20,
    fontSize: 25,
  },
});

export default PickerItem;
