import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import AppPictureButton from "../components/AppPictureButton";
import AppMenuButton from "../components/AppMenuButton";
import AppMenuModal from "../components/AppMenuModal";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user._id");
    } catch (error) {
      console.log("Error during logout : ", error);
      return;
    }

    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.image}
        ></Image>

        <View style={styles.menuIcon}>
          <AppMenuButton
            onPress={() => setModalVisible(!modalVisible)}
          ></AppMenuButton>
          {modalVisible && (
            <View style={styles.modalContainer}>
              <AppMenuModal
                onLogout={handleLogout}
                visible={modalVisible}
                onClose={() => setModalVisible(!modalVisible)}
              ></AppMenuModal>
            </View>
          )}
        </View>
      </View>

      <View style={styles.images}>
        <AppPictureButton
          image={require("../assets/tennis2.png")}
          text={"Book a Tennis Court"}
          onPress={() => navigation.navigate("TennisBooking")}
        ></AppPictureButton>
        <AppPictureButton
          image={require("../assets/pickleball2.png")}
          text={"Book a Pickleball Court"}
          onPress={() => navigation.navigate("PickleballBooking")}
        ></AppPictureButton>
        <AppPictureButton
          image={require("../assets/proshop2.png")}
          text={"My Bookings"}
          onPress={() => navigation.navigate("MyBookings")}
        ></AppPictureButton>
        <AppPictureButton
          image={require("../assets/overlook2.png")}
          text={"GOAT"}
        ></AppPictureButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 100,
    resizeMode: "contain",
    width: 100,
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: colors.black,
    height: 130,
    justifyContent: "center",
    position: "relative",
    width: "100%",
  },
  images: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  menuIcon: {
    left: 20,
    position: "absolute",
    top: 20,
  },
});

export default HomeScreen;
