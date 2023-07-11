import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

function AppLottieView({ lottie }) {
  return (
    <View>
      <LottieView source={lottie} style={styles.animation} autoPlay />
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 100,
    height: 100,
  },
});

export default AppLottieView;
