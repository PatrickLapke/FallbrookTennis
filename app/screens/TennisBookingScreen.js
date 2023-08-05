import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import AppPicker from "../components/AppPicker";
import Toggle from "../components/Toggle";
import AppDisplayBox from "../components/AppDisplayBox";
import AppButton from "../components/AppButton";
import CourtDisplayText from "../components/CourtDisplayText";
import { times } from "../components/times";
import AppBoxButton from "../components/AppDateButton";
import colors from "../config/colors";
import SuccessScreen from "../screens/SuccessScreen";
import AppDelay from "../components/AppDelay";
import {
  fetchAvailableTennisCourts,
  handleTennisBook,
} from "../API/tennisCourts";
import { resendVerificationEmail } from "../API/users";

function TennisBooking({ navigation }) {
  const [time, setTime] = useState();
  const [isSingles, setIsSingles] = useState(null);
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [firstSelectionsMade, setFirstSelectionsMade] = useState(false);
  const [allSelectionsMade, setAllSelectionsMade] = useState(false);
  const [noCourtsMessage, setNoCourtsMessage] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const checkFirstSelections = () => {
    if (selectedDate && time && isSingles !== null) {
      setFirstSelectionsMade(true);
    } else setFirstSelectionsMade(false);
  };

  const checkAllSelections = () => {
    if (selectedDate && time && isSingles !== null && selectedCourt !== null) {
      setAllSelectionsMade(true);
    } else setAllSelectionsMade(false);
  };

  useEffect(() => {
    if (errorMsg) {
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
      if (time && selectedDate && isSingles !== null) {
        try {
          const courts = await fetchAvailableTennisCourts(
            selectedDate,
            time,
            isSingles
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
      const response = await handleTennisBook(
        selectedDate,
        time,
        isSingles,
        selectedCourt
      );

      if (response.status === 201) {
        setShowSuccess(true);
        await AppDelay(1500);
        setShowSuccess(false);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log("Some error hit on the handlePost for tennis");

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
      // console.log(error.response.data);
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
        <AppBoxButton
          backButton
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
              : "Please select the date, start time, and singles or doubles to display the available courts here. Please note that singles is 60 minutes play time, and doubles is 90 minutes play time."
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
      {showSuccess && <SuccessScreen visible={showSuccess} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: colors.white,
    marginTop: 5,
  },
});

export default TennisBooking;
