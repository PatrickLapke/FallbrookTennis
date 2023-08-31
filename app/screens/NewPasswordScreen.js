import React, { useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AppDelay from "../components/AppDelay";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import SuccessScreen from "../screens/SuccessScreen";
import colors from "../config/colors";
const { IP_HOME, IP_SCHOOL, IP_TESTER } = require("../IP/ip");

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(5).label("Password"),
  confirmPassword: Yup.string()
    .required("Confirm Password is a required field")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

function NewPasswordScreen({ navigation, route }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordResetToken, setPasswordResetToken] = useState(
    route.params.passwordResetToken
  );

  const handlePasswordChange = async (values) => {
    const { password } = values;
    console.log({ password: password, passwordResetToken: passwordResetToken });

    try {
      const response = await axios.post(
        `http://${IP_TESTER}:3000/api/users/change-password`,
        {
          password: password,
          passwordResetToken: passwordResetToken,
        }
      );

      if (response.status === 200) {
        setShowSuccess(true);
        await AppDelay(1500);
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
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
        {showSuccess && <SuccessScreen visible={showSuccess} />}
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
    marginTop: 20,
    width: 220,
  },
});

export default NewPasswordScreen;
