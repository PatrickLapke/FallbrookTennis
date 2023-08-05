import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppBackButton({ onPress, color = "black", size = 35, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <MaterialCommunityIcons
        name="chevron-left-circle"
        color={color}
        size={size}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppBackButton;
