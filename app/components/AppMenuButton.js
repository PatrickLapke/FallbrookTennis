import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppMenuButton({ onPress }) {
  return (
    <TouchableOpacity>
      <MaterialCommunityIcons
        name="menu"
        size={46}
        color="white"
        onPress={onPress}
        testID="menu-button-icon"
      ></MaterialCommunityIcons>
    </TouchableOpacity>
  );
}

export default AppMenuButton;
