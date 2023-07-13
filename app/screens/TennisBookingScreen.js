import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import axios from "axios";
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppPicker from "../components/AppPicker";
import Toggle from "../components/Toggle";
import AppDisplayBox from "../components/AppDisplayBox";
import AppButton from "../components/AppButton";
import CourtDisplayText from "../components/CourtDisplayText";
import { times } from "../components/times";
import AppBoxButton from "../components/AppDateButton";
import { computeTimes } from "../functions/computeTimes";
import colors from "../config/colors";
const { IP_HOME, IP_SCHOOL } = require("../IP/ip");

function TennisBooking() {
  const [time, setTime] = useState();
  const [isSingles, setIsSingles] = useState(null);
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [firstSelectionsMade, setFirstSelectionsMade] = useState(false);
  const [allSelectionsMade, setAllSelectionsMade] = useState(false);
  const [noCourtsMessage, setNoCourtsMessage] = useState();

  const checkFirstSelections = () => {
    if (selectedDate && time && isSingles !== null) {
      setFirstSelectionsMade(true);
    } else setFirstSelectionsMade(false);
  };

  const checkAllSelections = () => {
    if (selectedDate && time && isSingles && selectedCourt !== null) {
      setAllSelectionsMade(true);
    } else setAllSelectionsMade(false);
  };

  useEffect(() => {
    const fetchCourts = async () => {
      if (time && selectedDate && isSingles !== null) {
        try {
          const { startTime, endTime } = computeTimes(
            selectedDate,
            time,
            isSingles
          );
          //toISOString() converts this value to a string so in the backend, it needs to converted back to a date Object.
          const response = await axios.get(
            `http://${IP_HOME}:3000/api/tennisCourts?startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`
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
  }, [time, isSingles, selectedDate, selectedCourt]);

  const handleAlert = () => {
    Alert.alert(
      "Incomplete Selections",
      "Please select the date, time, singles or doubles, and a court to proceed.",
      [{ text: "Ok" }]
    );
  };

  const handlePost = async () => {
    try {
      const { startTime, endTime } = computeTimes(
        selectedDate,
        time,
        isSingles
      );

      await axios.post(
        `http://${IP_HOME}:3000/api/tennisCourts/bookings`,
        {
          startTime: startTime,
          endTime: endTime,
          courtId: selectedCourt._id,
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
      console.log("Some error hit on the handlePost for tennis");
      console.log(error);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <AppBoxButton
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        ></AppBoxButton>
        <AppPicker
          icon={"clock-outline"}
          items={times}
          placeholder={"Select a start time"}
          selectedItem={time}
          onSelectItem={(item) => setTime(item)}
        ></AppPicker>
        <Toggle isSingles={isSingles} setIsSingles={setIsSingles}></Toggle>
        <AppDisplayBox
          marginTop={20}
          marginBottom={20}
          text={
            firstSelectionsMade
              ? courts.length === 0
                ? noCourtsMessage
                : null
              : "Please select the date, start time, and singles or doubles to display the available courts here."
          }
        >
          {courts.map((court) => (
            <CourtDisplayText
              key={court._id}
              court={court}
              setSelectedCourt={setSelectedCourt}
              selectedCourt={selectedCourt}
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
  container: { flex: 1, marginBottom: 10, backgroundColor: colors.white },
});

export default TennisBooking;
