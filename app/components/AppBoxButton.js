import { addDays, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function AppBoxButton({ selectedDate, setSelectedDate }) {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const currentDay = new Date();
    const nextDay = addDays(currentDay, 1);
    const nextNextDay = addDays(currentDay, 2);

    const datesFormatted = [
      format(currentDay, "MM/dd"),
      format(nextDay, "MM/dd"),
      format(nextNextDay, "MM/dd"),
    ];

    setDates(datesFormatted);
  }, []);

  return (
    <View style={styles.container}>
      {dates.map((date) => (
        <TouchableOpacity
          style={[styles.dateBox, date === selectedDate && styles.selected]}
          key={date}
          onPress={() => setSelectedDate(date)}
        >
          <AppText
            style={[styles.text, date === selectedDate && styles.selectedText]}
          >
            {date}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  dateBox: {
    alignItems: "center",
    borderRadius: 25,

    flexBasis: 0,
    flexGrow: 1,
    justifyContent: "center",
    padding: 15,
    margin: 5,
    marginBottom: 7,
    marginTop: 20,
    backgroundColor: colors.light,
  },
  selected: {
    backgroundColor: colors.primary,
  },
  selectedText: {
    color: colors.white,
  },
  text: {
    fontSize: 25,
  },
});

export default AppBoxButton;
