import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { computeTimes } from "../functions/computeTimes";

const { IP_HOME, IP_SCHOOL, IP_TESTER } = require("../IP/ip");

const fetchTennisBookings = async () => {
  try {
    const response = await axios.get(
      `http://${IP_HOME}:3000/api/bookings/tennis`,
      {
        headers: {
          "x-auth-token": await AsyncStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Client side error hit on Tennis: ", error);
    return [];
  }
};

const fetchAvailableTennisCourts = async (selectedDate, time, isSingles) => {
  const { startTime, endTime } = computeTimes(selectedDate, time, isSingles);
  const response = await axios.get(
    `http://${IP_HOME}:3000/api/tennisCourts?startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`
  );

  return response.data;
};

const handleTennisBook = async (
  selectedDate,
  time,
  isSingles,
  selectedCourt
) => {
  const { startTime, endTime } = computeTimes(selectedDate, time, isSingles);

  const userId = await AsyncStorage.getItem("user._id");
  const token = await AsyncStorage.getItem("token");

  const response = await axios.post(
    `http://${IP_HOME}:3000/api/tennisCourts/bookings`,
    {
      startTime: startTime,
      endTime: endTime,
      courtId: selectedCourt._id,
      userId: userId,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );

  return response;
};

const deleteTennisCourtBooking = async (bookingId) => {
  try {
    const response = await axios.delete(
      `http://${IP_HOME}:3000/api/bookings/tennis/${bookingId}`
    );
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      return null;
    } else {
      console.log(error);
      return null;
    }
  }
};

module.exports = {
  fetchTennisBookings,
  fetchAvailableTennisCourts,
  handleTennisBook,
  deleteTennisCourtBooking,
};
