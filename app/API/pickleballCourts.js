import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { IP_HOME, IP_SCHOOL } = require("../IP/ip");

const fetchBookedPickleballCourts = async () => {
  try {
    const response = await axios.get(
      `http://${IP_HOME}:3000/api/bookings/pickleball`,
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

const deletePickleballCourt = async (bookingId) => {
  try {
    const response = await axios.delete(
      `http://${IP_HOME}:3000/api/bookings/pickleball/${bookingId}`
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

module.exports = { fetchBookedPickleballCourts, deletePickleballCourt };
