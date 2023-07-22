import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { IP_HOME, IP_SCHOOL } = require("../IP/ip");

const resendVerificationEmail = async () => {
  const userId = await AsyncStorage.getItem("user._id");
  const token = await AsyncStorage.getItem("token");

  const response = await axios.post(
    `http://${IP_HOME}:3000/api/users/resendVerification`,
    { userId },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );

  return response;
};

module.exports = {
  resendVerificationEmail,
};
