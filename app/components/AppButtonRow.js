import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "./AppButton";

function AppCircleButtons({ selectedHours, setSelectedHours }) {
  const buttons = [1, 1.5, 2, 2.5, 3];

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <AppButton
          key={index}
          width="15%"
          title={button}
          color={selectedHours === button ? "primary" : "light"}
          onPress={() => setSelectedHours(button)}
          textColor={selectedHours === button ? "white" : "black"}
        ></AppButton>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-evenly" },
});

export default AppCircleButtons;
