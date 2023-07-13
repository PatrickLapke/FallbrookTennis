import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppDateButton from "../components/AppDateButton";
import AppPicker from "../components/AppPicker";
import AppDisplayBox from "../components/AppDisplayBox";
import Screen from "../components/Screen";
import { times } from "../components/times";
import AppButtonRow from "../components/AppButtonRow";
import CourtDisplayText from "../components/CourtDisplayText";
import AppButton from "../components/AppButton";
import { computePickleballTimes } from "../functions/computePickleballTimes";
import colors from "../config/colors";
const { IP_HOME, IP_SCHOOL } = require("../IP/ip");

function PickleballBookingScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState();
  const [selectedHours, setSelectedHours] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [courts, setCourts] = useState([]);
  const [noCourtsMessage, setNoCourtsMessage] = useState();
  const [firstSelectionsMade, setFirstSelectionsMade] = useState(false);
  const [allSelectionsMade, setAllSelectionsMade] = useState(false);

  const checkFirstSelections = () => {
    if (selectedDate && time && selectedHours !== null) {
      setFirstSelectionsMade(true);
    } else setFirstSelectionsMade(false);
  };

  const checkAllSelections = () => {
    if (selectedDate && time && selectedHours && selectedCourt !== null) {
      setAllSelectionsMade(true);
    } else setAllSelectionsMade(false);
  };

  useEffect(() => {
    const fetchCourts = async () => {
      if (time && selectedDate && selectedHours !== null) {
        try {
          const { startTime, endTime } = computePickleballTimes(
            selectedDate,
            time,
            selectedHours
          );
          const response = await axios.get(
            `http://${IP_HOME}:3000/api/pickleballCourts?startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`
          );
          if (Array.isArray(response.data) && response.data.length > 0) {
            setCourts(response.data);
            setNoCourtsMessage("");
          } else {
            setCourts([]);
            setNoCourtsMessage(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchCourts();
    checkFirstSelections();
    checkAllSelections();
  }, [time, selectedHours, selectedDate, selectedCourt]);

  const handleAlert = () => {
    Alert.alert(
      "Incomplete Selections",
      "Please select the date, time, hours of reservation, and a court to proceed.",
      [{ text: "Ok" }]
    );
  };

  const handlePost = async () => {
    try {
      const { startTime, endTime } = computePickleballTimes(
        selectedDate,
        time,
        selectedHours
      );

      await axios.post(
        `http://${IP_HOME}:3000/api/pickleballCourts/bookings`,
        {
          startTime: startTime,
          endTime: endTime,
          pickleballCourtId: selectedCourt._id,
          userId: await AsyncStorage.getItem("user._id"),
        },
        {
          headers: {
            "x-auth-token": await AsyncStorage.getItem("token"),
          },
        }
      );
      console.log("Booking added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <AppDateButton
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        ></AppDateButton>
        <AppPicker
          icon={"clock-outline"}
          items={times}
          placeholder={"Select your start time..."}
          selectedItem={time}
          onSelectItem={(item) => setTime(item)}
        ></AppPicker>
        <AppButtonRow
          selectedHours={selectedHours}
          setSelectedHours={setSelectedHours}
        ></AppButtonRow>
        <AppDisplayBox
          marginTop={20}
          marginBottom={20}
          text={
            firstSelectionsMade
              ? courts.length === 0
                ? noCourtsMessage
                : null
              : "Please select the date, start time, and number of hours to display the available courts here."
          }
        >
          {courts.map((pickleballCourt, index) => (
            <CourtDisplayText
              key={pickleballCourt._id}
              court={pickleballCourt}
              setSelectedCourt={setSelectedCourt}
              selectedCourt={selectedCourt}
              isFirst={index == 0}
            ></CourtDisplayText>
          ))}
        </AppDisplayBox>
        <AppButton
          title={"Book Now"}
          color={allSelectionsMade ? "primary" : "light"}
          onPress={allSelectionsMade ? handlePost : handleAlert}
          textColor={allSelectionsMade ? "white" : "black"}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
});

export default PickleballBookingScreen;
