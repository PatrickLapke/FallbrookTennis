import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import LottieView from "lottie-react-native";

function SuccessScreen({ visible = false }) {
  if (!visible) return null;

  return (
    <Modal transparent visible={true}>
      <View style={styles.success}>
        <View style={styles.lottieContainer}>
          <LottieView
            source={require("../assets/success.json")}
            autoPlay
            loop
            resizeMode="cover"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  lottieContainer: { width: 200, height: 200 },
  success: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default SuccessScreen;
