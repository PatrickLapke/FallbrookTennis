import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";
const { IP_HOME, IP_SCHOOL } = require("../IP/ip");

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(5).label("Password"),
  confirmPassword: Yup.string()
    .required("Confirm Password is a required field")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

function NewPasswordScreen({ navigation, route }) {
  const [passwordResetToken, setPasswordResetToken] = useState(
    route.params.passwordResetToken
  );

  const handlePasswordChange = async (values) => {
    const { password } = values;
    console.log({ password: password, passwordResetToken: passwordResetToken });

    try {
      const response = await axios.post(
        `http://${IP_HOME}:3000/api/users/change-password`,
        {
          password: password,
          passwordResetToken: passwordResetToken,
        }
      );

      if (response.status === 200) {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/fallbrook-logo.png")}
      />
      <AppForm
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={handlePasswordChange}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="New Password"
          secureTextEntry
          textContentType="password"
        ></AppFormField>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
          textContentType="password"
        ></AppFormField>
        <SubmitButton title={"Reset Password"} />
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

export default NewPasswordScreen;
