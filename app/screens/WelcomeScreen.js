import React from "react";
import { View, StyleSheet, ImageBackground, Image, Text } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

const handleSubmit = () => {
  console.log("Button Pressed.");
};

function WelcomeScreen() {
  return (
    <ImageBackground
      source={require("../assets/tennis-paddles-balls-arrangement.jpg")}
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/tennis.png")}
          style={styles.logo}
        ></Image>
        <AppText style={styles.motto}>
          Fallbrook Tennis and Pickleball Club
        </AppText>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="LOGIN"
          style={styles.loginButton}
          onPress={handleSubmit}
        />
        <AppButton title="REGISTER" color="secondary" onPress={handleSubmit} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    alignItems: "center",
    width: "90%",
    marginBottom: 80,
  },
  logo: {
    height: 100,
    width: 100,
  },
  logoContainer: {
    alignItems: "center",
    position: "absolute",
    top: 70,
  },
  motto: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});

export default WelcomeScreen;
