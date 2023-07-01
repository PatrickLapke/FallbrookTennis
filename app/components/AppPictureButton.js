import React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function AppBooking({ image, text, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <ImageBackground source={image} style={styles.imageBackground}>
        <AppText style={styles.text}>{text}</AppText>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 150,
    width: "100%",
  },
  imageBackground: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  text: { fontSize: 30, color: colors.white, fontWeight: "bold" },
});

export default AppBooking;
