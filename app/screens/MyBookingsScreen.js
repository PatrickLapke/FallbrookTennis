import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import LottieView from "lottie-react-native";

import CourtDisplayText from "../components/CourtDisplayText";
import AppDisplayBox from "../components/AppDisplayBox";
import AppMyBookingText from "../components/AppMyBookingText";
import SuccessScreen from "./SuccessScreen";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppDelay from "../components/AppDelay";

const { IP_HOME, IP_SCHOOL } = require("../IP/ip");

function MyBookings() {
  const [isLoading, setIsLoading] = useState(false);
  const [pickleballCourts, setPickleballCourts] = useState([]);
  const [tennisCourts, setTennisCourts] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchTennisCourts = async () => {
    try {
      const response = await axios.get(
        `http://${IP_SCHOOL}:3000/api/bookings/tennis`,
        {
          headers: {
            "x-auth-token": await AsyncStorage.getItem("token"),
          },
        }
      );
      setTennisCourts(response.data);
    } catch (error) {
      console.log("Client side error hit: ", error.response.data);
    }
  };

  const fetchPickleballCourts = async () => {
    try {
      const response = await axios.get(
        `http://${IP_SCHOOL}:3000/api/bookings/pickleball`,
        {
          headers: {
            "x-auth-token": await AsyncStorage.getItem("token"),
          },
        }
      );
      setPickleballCourts(response.data);
    } catch (error) {
      console.log("Client side error hit: ", error);
    }
  };

  useEffect(() => {
    fetchTennisCourts();
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

            try {
              const response = await axios.delete(
                `http://${IP_SCHOOL}:3000/api/bookings/pickleball/${bookingId}`
              );
              if (response.status === 200) {
                await fetchPickleballCourts();
                await AppDelay(1000);
                setIsLoading(false);
                console.log("About to start");
                setShowSuccess(true);
                await AppDelay(1500);
                setShowSuccess(false);
                console.log("About to stop");
              }
            } catch (error) {
              if (error.response) console.log(error.response);
              else console.log(error);
            }
          },
        },
      ]
    );
  };

  return (
    <Screen>
      {/* Start of Tennis box */}

      <View style={styles.container}>
        <AppDisplayBox
          marginTop={10}
          marginBottom={10}
          header={"Tennis Bookings"}
        >
          {tennisCourts.length === 0 ? (
            <View style={styles.noCourtText}>
              <AppText>No Current Tennis Bookings</AppText>
            </View>
          ) : (
            tennisCourts.map((tennisCourt) => (
              <AppMyBookingText
                key={tennisCourt._id}
                court={tennisCourt}
                onPress={() => console.log("Hello")}
              ></AppMyBookingText>
            ))
          )}
        </AppDisplayBox>
        {/* Start of pickleball box */}

        <AppDisplayBox
          marginTop={10}
          marginBottom={10}
          header={"Pickleball Bookings"}
        >
          {pickleballCourts.length === 0 ? (
            <View style={styles.noCourtText}>
              <AppText>No Current Pickleball Bookings</AppText>
            </View>
          ) : (
            pickleballCourts.map((pickleballCourt) => (
              <AppMyBookingText
                key={pickleballCourt._id}
                court={pickleballCourt}
                onPress={deletePickleballCourt}
              ></AppMyBookingText>
            ))
          )}
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
        {showSuccess && <SuccessScreen visible={showSuccess} />}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
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
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  noCourtText: {
    alignItems: "center",
    marginTop: 30,
  },
});

export default MyBookings;
