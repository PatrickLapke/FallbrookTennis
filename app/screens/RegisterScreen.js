import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

import SuccessScreen from "./SuccessScreen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";
import AppDelay from "../components/AppDelay";

const { IP_HOME, IP_SCHOOL } = require("../IP/ip");

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string()
    .required("Confirm password is a required field")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

function RegisterScreen({ navigation }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (values) => {
    const { firstName, lastName, email, password } = values;

    setIsLoading(true);

    try {
      const response = await axios.post(`http://${IP_HOME}:3000/api/users`, {
        name: `${firstName} ${lastName}`,
        email: email,
        password: password,
      });

      await AsyncStorage.setItem("token", response.headers["x-auth-token"]);
      await AsyncStorage.setItem("user._id", response.headers["x-user-id"]);

      if (response.status === 201) {
        await AppDelay(1000);
        setIsLoading(false);
        setShowSuccess(true);
        await AppDelay(1500);
        setShowSuccess(false);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.content}>
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/fallbrook-logo.png")}
            style={styles.image}
          />
        </View>
        <AppForm
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleRegister}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="words"
            autoCorrect={false}
            icon="account"
            keyboardType="default"
            name="firstName"
            placeholder="First Name"
            textContentType="givenName"
          />
          <AppFormField
            autoCapitalize="words"
            autoCorrect={false}
            icon="account"
            keyboardType="default"
            name="lastName"
            placeholder="Last Name"
            textContentType="familyName"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="confirmPassword"
            placeholder="Confirm Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" />
        </AppForm>
      </KeyboardAwareScrollView>
      {isLoading && (
        <View style={styles.overlay}>
          <LottieView
            source={require("../../app/assets/bouncing_ball.json")}
            autoPlay
            loop
          />
        </View>
      )}
      {showSuccess && <SuccessScreen visible={showSuccess} loop />}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.white,
    paddingTop: 5,
  },
  contentContainer: {
    justifyContent: "flex-end",
    flexGrow: 1,
    marginBottom: 10,
  },
  logoContainer: { alignItems: "center" },
  image: {
    marginBottom: 20,
    height: 220,
    width: 220,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterScreen;
