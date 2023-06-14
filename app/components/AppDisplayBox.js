import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";

function AppDisplayBox({ marginTop = 0, marginBottom = 0, children }) {
  return (
    <View
      style={[
        styles.container,
        { marginTop: marginTop, marginBottom: marginBottom },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flex: 1,
  },
});

export default AppDisplayBox;
