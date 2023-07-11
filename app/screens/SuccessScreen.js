import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function SuccessScreen({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.success}>
      <LottieView
        source={require("../assets/success.json")}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 500,
    height: 500,
  },
  success: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default SuccessScreen;
