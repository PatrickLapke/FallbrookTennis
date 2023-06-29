import React from "react";
import { TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function CourtDisplayText({ court, selectedCourt, setSelectedCourt, isFirst }) {
  const itemStyle = isFirst ? styles.first : {};

  return (
    <TouchableOpacity
      style={[
        itemStyle,
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
  first: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
});

export default CourtDisplayText;
