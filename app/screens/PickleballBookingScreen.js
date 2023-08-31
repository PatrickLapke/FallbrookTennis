import React, { useEffect, useState } from "react";
import { Alert, View, StyleSheet } from "react-native";

import AppDateButton from "../components/AppDateButton";
import AppPicker from "../components/AppPicker";
import AppDisplayBox from "../components/AppDisplayBox";
import { times } from "../components/times";
import AppButtonRow from "../components/AppButtonRow";
import CourtDisplayText from "../components/CourtDisplayText";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import SuccessScreen from "./SuccessScreen";
import AppDelay from "../components/AppDelay";
import {
  fetchAvailablePickleballCourts,
  handlePickleballBook,
} from "../API/pickleballCourts";
import { resendVerificationEmail } from "../API/users";

function PickleballBookingScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState();
  const [selectedHours, setSelectedHours] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [courts, setCourts] = useState([]);
  const [noCourtsMessage, setNoCourtsMessage] = useState();
  const [firstSelectionsMade, setFirstSelectionsMade] = useState(false);
  const [allSelectionsMade, setAllSelectionsMade] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

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
    if (errorMsg) {
      console.log("Here");
      Alert.alert("Error", errorMsg, [
        { text: "Back", onPress: () => setErrorMsg("") },
        {
          text: "Resend Email",
          onPress: () => {
            resendEmail(), setErrorMsg("");
          },
        },
      ]);
      setErrorMsg("");
    }
  });

  useEffect(() => {
    const getCourts = async () => {
      if (time && selectedDate && selectedHours !== null) {
        try {
          const courts = await fetchAvailablePickleballCourts(
            selectedDate,
            time,
            selectedHours
          );

          if (Array.isArray(courts) && courts.length > 0) {
            setCourts(courts);
            setNoCourtsMessage("");
          } else {
            setCourts([]);
            setNoCourtsMessage(courts);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getCourts();
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
      const response = await handlePickleballBook(
        selectedDate,
        time,
        selectedHours,
        selectedCourt
      );

      if (response.status === 201) {
        setShowSuccess(true);
        await AppDelay(1500);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 401) {
        setErrorMsg(error.response.data);
      }
    }
  };

  const resendEmail = async () => {
    try {
      const response = await resendVerificationEmail();

      if (response.status === 200) {
        Alert.alert(
          "Email Sent",
          "A verification email has been sent to your address.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.log("Error sending verification email:", error);

      Alert.alert(
        "Error",
        "An error occurred while sending the verification email. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <>
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
      {showSuccess && <SuccessScreen visible={showSuccess} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
});

export default PickleballBookingScreen;
