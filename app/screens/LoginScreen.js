import React from "react";
import { Image, KeyboardAvoidingView, StyleSheet } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
const { IP_HOME, IP_SCHOOL } = require("../IP/ip");

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen() {
  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      const response = await axios.post(`http://${IP_HOME}:3000/api/auth`, {
        email: email,
        password: password,
      });

      await AsyncStorage.setItem("token", response.headers["x-auth-token"]);
      await AsyncStorage.setItem("user._id", response.headers["x-user-id"]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
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
        </AppForm>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
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
