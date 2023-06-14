import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function CourtDisplayText({ court, setSelectedCourt }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setSelectedCourt(court)}
    >
      <AppText style={styles.text}>{court.courtName}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
  text: { padding: 15, fontSize: 25 },
});

export default CourtDisplayText;
