import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { format as formatDate } from "date-fns";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";

function AppMyBookingText({ court, onPress }) {
  return (
    <View style={styles.container}>
      {court.bookings.map((booking) => (
        <View style={styles.textContainer} key={booking._id}>
          <AppText style={styles.text}>{`${court.courtName}   ${formatDate(
            new Date(booking.startTime),
            "MM/dd   HH:mm"
          )} - ${formatDate(new Date(booking.endTime), "HH:mm")}`}</AppText>
          <TouchableOpacity onPress={() => onPress(booking._id, booking)}>
            <MaterialCommunityIcons
              name="delete-forever"
              size={35}
              color={colors.danger}
              style={styles.icon}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    margin: 5,
    marginTop: 15,
  },
  textContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default AppMyBookingText;
