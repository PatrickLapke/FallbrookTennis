import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import { addHours, setHours, setMinutes, startOfTomorrow } from "date-fns";

import Screen from "../components/Screen";
import AppPicker from "../components/AppPicker";
import Toggle from "../components/Toggle";
import AppDisplayBox from "../components/AppDisplayBox";
import AppButton from "../components/AppButton";
import CourtDisplayText from "../components/CourtDisplayText";
import { times } from "../components/Times";

function TennisBooking() {
  const [time, setTime] = useState();
  const [isSingles, setIsSingles] = useState(null);
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);

  useEffect(() => {
    const fetchCourts = async () => {
      if (time && isSingles !== null) {
        try {
          const endTime = addHours(time.value, isSingles ? 1 : 1.5);
          const response = await axios.get(
            `http://192.168.0.16:3000/courts?startTime=${time.value.toISOString()}&endTime=${endTime.toISOString()}`
          );
          setCourts(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchCourts();
  }, [time, isSingles]);

  const handlePost = async () => {
    try {
      const endTime = addHours(time.value, isSingles ? 1 : 1.5);
      await axios.post("http://192.168.0.16:3000/courts/bookings", {
        startTime: time.value,
        endTime: endTime,
        courtId: selectedCourt._id,
      });
      console.log("Booking added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <AppPicker
          icon={"clock-outline"}
          items={times}
          placeholder={"Select a start time"}
          selectedItem={time}
          onSelectItem={(item) => setTime(item)}
        ></AppPicker>
        <Toggle isSingles={isSingles} setIsSingles={setIsSingles}></Toggle>
        <AppDisplayBox marginTop={20} marginBottom={20}>
          {courts.map((court) => (
            <CourtDisplayText
              key={court._id}
              court={court}
              setSelectedCourt={setSelectedCourt}
            ></CourtDisplayText>
          ))}
        </AppDisplayBox>
        <AppButton title={"Book Now"} color="primary" onPress={handlePost} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 10 },
});

export default TennisBooking;
