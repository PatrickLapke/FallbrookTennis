import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import AppPictureButton from "../components/AppPictureButton";
import Screen from "../components/Screen";
import colors from "../config/colors";

function HomeScreen() {
  return (
    <Screen style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.images}>
        <AppPictureButton
          image={require("../assets/tennis2.png")}
          text={"Book a Tennis Court"}
        ></AppPictureButton>
        <AppPictureButton
          image={require("../assets/pickleball2.png")}
          text={"Book a Pickleball Court"}
        ></AppPictureButton>
        <AppPictureButton
          image={require("../assets/proshop2.png")}
          text={"My Bookings"}
        ></AppPictureButton>
        <AppPictureButton
          image={require("../assets/overlook2.png")}
          text={"GOAT"}
        ></AppPictureButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  images: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  imageContainer: {
    backgroundColor: colors.black,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 130,
  },
});

export default HomeScreen;
