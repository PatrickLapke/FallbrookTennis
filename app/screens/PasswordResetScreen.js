import React, { useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";
const { IP_HOME, IP_SCHOOL, IP_TESTER } = require("../IP/ip");

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function PasswordResetScreen({ navigation }) {
  const [showResetField, setShowResetField] = useState(false);
  const handleReset = async (values) => {
    const { email } = values;
    try {
      const response = await axios.post(
        `http://${IP_HOME}:3000/api/users/password-reset`,
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
        `http://${IP_HOME}:3000/api/users/password-reset/confirm`,
        { passwordResetToken: passwordResetToken }
      );
      if (response.status === 200) {
        navigation.navigate("New Password", {
          passwordResetToken: passwordResetToken,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
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
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, flex: 1 },
  contentContainer: {
    // justifyContent: "flex-end",
    // flexGrow: 1,
    marginBottom: 10,
  },
  logo: {
    alignSelf: "center",
    height: 220,
    marginBottom: 20,
    marginTop: 35,
    width: 220,
  },
});

export default PasswordResetScreen;
