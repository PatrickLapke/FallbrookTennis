import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import colors from "../config/colors";

function AppDisplayBox({ marginTop = 0, marginBottom = 0, children }) {
  return (
    <ScrollView
      style={[
        styles.container,
        { marginTop: marginTop, marginBottom: marginBottom },
      ]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flex: 1,
    overflow: "hidden",
    padding: 1,
  },
});

export default AppDisplayBox;
