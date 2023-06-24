import React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { View, StyleSheet } from "react-native";
import Screen from "./Screen";
import AppText from "./AppText";
import colors from "../config/colors";

function AppBooking({ image, text }) {
  return (
    <TouchableOpacity style={styles.button}>
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
