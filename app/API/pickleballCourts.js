import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { computePickleballTimes } from "../functions/computePickleballTimes";

const { IP_HOME, IP_SCHOOL } = require("../IP/ip");

const fetchBookedPickleballCourts = async () => {
  try {
    const response = await axios.get(
      `http://${IP_SCHOOL}:3000/api/bookings/pickleball`,
      {
        headers: {
          "x-auth-token": await AsyncStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Client side error hit on Pickleball: ", error);
    return [];
  }
};

const fetchAvailablePickleballCourts = async (
  selectedDate,
  time,
  selectedHours
) => {
  const { startTime, endTime } = computePickleballTimes(
    selectedDate,
    time,
    selectedHours
  );
  const response = await axios.get(
    `http://${IP_SCHOOL}:3000/api/pickleballCourts?startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`
  );
  return response.data;
};

const handlePickleballBook = async (
  selectedDate,
  time,
  selectedHours,
  selectedCourt
) => {
  const { startTime, endTime } = computePickleballTimes(
    selectedDate,
    time,
    selectedHours
  );

  const userId = await AsyncStorage.getItem("user._id");
  const token = await AsyncStorage.getItem("token");

  const response = await axios.post(
    `http://${IP_SCHOOL}:3000/api/pickleballCourts/bookings`,
    {
      startTime: startTime,
      endTime: endTime,
      pickleballCourtId: selectedCourt._id,
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

const deletePickleballCourt = async (bookingId) => {
  try {
    const response = await axios.delete(
      `http://${IP_SCHOOL}:3000/api/bookings/pickleball/${bookingId}`
    );
    if (response.status === 200) {
      return response.data;
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
  fetchBookedPickleballCourts,
  fetchAvailablePickleballCourts,
  handlePickleballBook,
  deletePickleballCourt,
};
