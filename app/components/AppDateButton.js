import { addDays, addMonths, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function AppBoxButton({ selectedDate, setSelectedDate }) {
  const [dates, setDates] = useState([]);
  const [month, setMonth] = useState();

  useEffect(() => {
    const currentDay = new Date();
    const nextDay = addDays(currentDay, 1);
    const nextNextDay = addDays(currentDay, 2);

    setMonth(format(currentDay, "MMMM"));

    const datesFormatted = [
      {
        dayOfWeek: format(currentDay, "EEE"),
        dayOfMonth: format(currentDay, "dd"),
        fullDate: format(currentDay, "MM/dd"),
      },
      {
        dayOfWeek: format(nextDay, "EEE"),
        dayOfMonth: format(nextDay, "dd"),
        fullDate: format(nextDay, "MM/dd"),
      },
      {
        dayOfWeek: format(nextNextDay, "EEE"),
        dayOfMonth: format(nextNextDay, "dd"),
        fullDate: format(nextNextDay, "MM/dd"),
      },
    ];

    setDates(datesFormatted);
  }, []);

  return (
    <View>
      <View style={styles.monthText}>
        <AppText style={styles.text}>{month}</AppText>
      </View>
      <View style={styles.datesContainer}>
        {dates.map((date) => (
          <TouchableOpacity
            style={[
              styles.dateBox,
              date.fullDate === selectedDate && styles.selected,
            ]}
            key={date.fullDate}
            onPress={() => setSelectedDate(date.fullDate)}
          >
            <View style={styles.dateTextContainer}>
              <AppText
                style={[
                  styles.text,
                  date.fullDate === selectedDate && styles.selectedText,
                ]}
              >
                {date.dayOfWeek}
              </AppText>
              <AppText
                style={[
                  styles.text,
                  date.fullDate === selectedDate && styles.selectedText,
                ]}
              >
                {date.dayOfMonth}
              </AppText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  datesContainer: {
    flexDirection: "row",
  },
  dateBox: {
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 25,
    flexGrow: 1,
    justifyContent: "center",
    padding: 10,
    margin: 5,
    marginBottom: 7,
    backgroundColor: colors.light,
  },
  dateTextContainer: {
    alignItems: "center",
  },
  selected: {
    backgroundColor: colors.primary,
  },
  selectedText: {
    color: colors.white,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
  monthText: { marginLeft: 10 },
});

export default AppBoxButton;
