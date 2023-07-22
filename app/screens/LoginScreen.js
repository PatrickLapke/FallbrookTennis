import React from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";
import AppLink from "../components/AppLink";
import AppLinkText from "../components/AppLinkText";
const { IP_HOME, IP_SCHOOL } = require("../IP/ip");

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      const response = await axios.post(`http://${IP_HOME}:3000/api/auth`, {
        email: email,
        password: password,
      });

      await AsyncStorage.setItem("token", response.headers["x-auth-token"]);
      await AsyncStorage.setItem("user._id", response.headers["x-user-id"]);

      navigation.navigate("Home");
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  return (
    <Screen style={styles.container}>
      <KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        // keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../assets/fallbrook-logo.png")}
        />

        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleLogin}
          validationSchema={validationSchema}
        >
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
          <SubmitButton title="Login" />
          <AppLinkText
            text={"Need an account?"}
            linkText={"Register"}
            onPress={() => navigation.navigate("Register")}
          ></AppLinkText>
          <AppLink
            text={"Forgot Password?"}
            onPress={() => navigation.navigate("Password-Reset")}
          ></AppLink>
        </AppForm>
      </KeyboardAwareScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  logo: {
    alignSelf: "center",
    height: 220,
    marginBottom: 20,
    marginTop: 50,
    width: 220,
  },
});

export default LoginScreen;
