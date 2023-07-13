import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { Alert } from "react-native";

import {
  fetchBookedPickleballCourts,
  deletePickleballCourt,
} from "../API/pickleballCourts";
import {
  fetchTennisBookings,
  deleteTennisCourtBooking,
} from "../API/tennisCourts";
import AppDisplayBox from "../components/AppDisplayBox";
import AppMyBookingText from "../components/AppMyBookingText";
import SuccessScreen from "./SuccessScreen";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppDelay from "../components/AppDelay";

function MyBookings() {
  const [isLoading, setIsLoading] = useState(false);
  const [pickleballCourts, setPickleballCourts] = useState([]);
  const [tennisCourts, setTennisCourts] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchData = async () => {
    const tennisBookings = await fetchTennisBookings();
    const bookedPickleballCourts = await fetchBookedPickleballCourts();
    setTennisCourts(tennisBookings);
    setPickleballCourts(bookedPickleballCourts);
  };

  useEffect(() => {
    console.log("The value of showSuccess is now: ", showSuccess);
    fetchData();
  }, [showSuccess]);

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
                onPress={async (bookingId) => {
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
                          const result = await deleteTennisCourtBooking(
                            bookingId
                          );
                          if (result) {
                            await fetchData();
                            await AppDelay(1000);
                            setIsLoading(false);
                            setShowSuccess(true);
                            await AppDelay(1500);
                            setShowSuccess(false);
                          } else {
                            console.log("HHHHHEEEEEELLLPPPP");
                          }
                        },
                      },
                    ]
                  );
                }}
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
                onPress={async (bookingId) => {
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
                          const result = await deletePickleballCourt(bookingId);
                          if (result) {
                            await fetchData();
                            await AppDelay(1000);
                            setIsLoading(false);
                            setShowSuccess(true);
                            await AppDelay(1500);
                            setShowSuccess(false);
                          } else {
                            console.log("HHHHHEEEEEELLLPPPP");
                          }
                        },
                      },
                    ]
                  );
                }}
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
      </View>
      {showSuccess && <SuccessScreen visible={showSuccess} />}
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
