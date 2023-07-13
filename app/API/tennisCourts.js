import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { IP_HOME, IP_SCHOOL } = require("../IP/ip");

const fetchBookedTennisCourts = async () => {
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
    console.log("Client side error hit: ", error);
    return null;
  }
};

module.exports = fetchBookedTennisCourts;
