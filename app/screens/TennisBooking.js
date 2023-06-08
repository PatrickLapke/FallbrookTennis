import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppPicker from "../components/AppPicker";
import Toggle from "../components/Toggle";

const times = [
  {
    label: "7:00 AM",
    value: 1,
  },
  {
    label: "7:30 AM",
    value: 2,
  },
  {
    label: "8:00 AM",
    value: 3,
  },
  {
    label: "8:30 AM",
    value: 4,
  },
  {
    label: "9:30 AM",
    value: 5,
  },
  {
    label: "10:00 AM",
    value: 6,
  },
];

function TennisBooking() {
  const [time, setTime] = useState();
  return (
    <Screen>
      <AppPicker
        icon={"clock-outline"}
        items={times}
        placeholder={"Select a start time"}
        selectedItem={time}
        onSelectItem={(item) => setTime(item)}
      ></AppPicker>
      <Toggle></Toggle>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default TennisBooking;
