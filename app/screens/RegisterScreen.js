import React from "react";
import { Image, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import axios from "axios";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";
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
  const handleRegister = async (values) => {
    const { firstName, lastName, email, password } = values;
    try {
      await axios.post(`http://${IP_SCHOOL}:3000/api/users`, {
        name: `${firstName} ${lastName}`,
        email: email,
        password: password,
      });
      console.log("New member registered successfully");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Screen style={styles.content}>
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.white,
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
});

export default RegisterScreen;
