import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { IP_HOME, IP_SCHOOL } = require("../IP/ip");

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
    return null;
  }
};

const deleteTennisCourtBooking = async (bookingId) => {
  try {
    const response = await axios.delete(
      `http://${IP_HOME}:3000/api/bookings/tennis/${bookingId}`
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

module.exports = { fetchTennisBookings, deleteTennisCourtBooking };
