import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import LottieView from "lottie-react-native";

import CourtDisplayText from "../components/CourtDisplayText";
import AppDisplayBox from "../components/AppDisplayBox";
import AppMyBookingText from "../components/AppMyBookingText";
import colors from "../config/colors";

const { IP_HOME, IP_SCHOOL } = require("../IP/ip");

function MyBookings() {
  const [isLoading, setIsLoading] = useState(false);
  const [pickleballCourts, setPickleballCourts] = useState([]);

  const fetchPickleballCourts = async () => {
    try {
      const response = await axios.get(
        `http://${IP_HOME}:3000/api/bookings/pickleball`,
        {
          headers: {
            "x-auth-token": await AsyncStorage.getItem("token"),
          },
        }
      );
      setPickleballCourts(response.data);
    } catch (error) {
      console.log("Client side error hit: ", error.response.data);
    }
  };

  useEffect(() => {
    fetchPickleballCourts();
  }, []);

  const deletePickleballCourt = async (bookingId) => {
    Alert.alert(
      "Are you sure you want to delete this booking?",
      "This is a message",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: async () => {
            setIsLoading(true);
            console.log(isLoading);
            try {
              const response = await axios.delete(
                `http://${IP_HOME}:3000/api/bookings/pickleball/${bookingId}`
              );
              fetchPickleballCourts();
            } catch (error) {
              console.log(error.response.data);
            } finally {
              // setTimeout(() => setIsLoading(false), 1000);
              setIsLoading(false);
            }
            console.log(isLoading);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <AppDisplayBox marginTop={20} marginBottom={20}>
        {pickleballCourts.map((tennisCourt) => (
          <CourtDisplayText
            key={tennisCourt._id}
            court={tennisCourt}
          ></CourtDisplayText>
        ))}
      </AppDisplayBox>
      <AppDisplayBox marginTop={20} marginBottom={20}>
        {pickleballCourts.map((pickleballCourt) => (
          <AppMyBookingText
            key={pickleballCourt._id}
            court={pickleballCourt}
            onPress={deletePickleballCourt}
          ></AppMyBookingText>
        ))}
      </AppDisplayBox>
      {isLoading && (
        <View style={styles.overlay}>
          <LottieView
            source={require("../../app/assets/bouncing_ball.json")}
            autoPlay
            loop
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

export default MyBookings;
