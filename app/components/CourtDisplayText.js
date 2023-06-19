import React from "react";
import { TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function CourtDisplayText({ court, selectedCourt, setSelectedCourt }) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selectedCourt && selectedCourt._id === court._id && styles.selected,
      ]}
      onPress={() => setSelectedCourt(court)}
    >
      <AppText
        style={[
          styles.text,
          selectedCourt &&
            selectedCourt._id === court._id &&
            styles.selectedText,
        ]}
      >
        {court.courtName}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
  selected: {
    backgroundColor: colors.primary,
  },
  selectedText: {
    color: colors.white,
  },
  text: { padding: 15, fontSize: 21 },
});

export default CourtDisplayText;
