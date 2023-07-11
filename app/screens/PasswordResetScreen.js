import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import axios from "axios";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";
const { IP_HOME, IP_SCHOOL } = require("../IP/ip");

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function PasswordResetScreen({ navigation }) {
  const [showResetField, setShowResetField] = useState(false);
  const handleReset = async (values) => {
    const { email } = values;
    try {
      const response = await axios.post(
        `http://${IP_SCHOOL}:3000/api/users/password-reset`,
        {
          email: email,
        }
      );
      if (response.status === 200) {
        setShowResetField(true);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleCodeSubmit = async (values) => {
    const { passwordResetToken } = values;
    console.log(passwordResetToken);
    try {
      const response = await axios.post(
        `http://${IP_SCHOOL}:3000/api/users/password-reset/confirm`,
        { passwordResetToken: passwordResetToken }
      );
      if (response.status === 200) {
        navigation.navigate("NewPasswordScreen", {
          passwordResetToken: passwordResetToken,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Screen style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/fallbrook-logo.png")}
      />
      <AppForm
        initialValues={{ email: "" }}
        onSubmit={(values) =>
          showResetField ? handleCodeSubmit(values) : handleReset(values)
        }
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
        ></AppFormField>
        {showResetField && (
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="passwordResetToken"
            placeholder="Reset Code"
          ></AppFormField>
        )}
        <SubmitButton
          title={showResetField ? "Submit Code" : "Reset Password"}
        />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white },
  logo: {
    alignSelf: "center",
    height: 220,
    marginBottom: 20,
    marginTop: 50,
    width: 220,
  },
});

export default PasswordResetScreen;
