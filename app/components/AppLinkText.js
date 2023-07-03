import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function AppLinkText({ text, linkText, onPress }) {
  return (
    <View style={styles.container}>
      <AppText>{text}</AppText>
      <TouchableOpacity onPress={onPress}>
        <AppText style={styles.text}>{linkText}</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
  text: { color: colors.blue, marginLeft: 10 },
});

export default AppLinkText;
