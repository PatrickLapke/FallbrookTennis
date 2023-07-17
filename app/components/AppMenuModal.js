import React from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";

function AppMenuModal({ visible, onClose, onLogout, onAbout }) {
  return (
    <Modal visible={visible} transparent={true}>
      <TouchableOpacity
        onPress={onClose}
        activeOpacity={1}
        style={styles.backdrop}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={onLogout} style={styles.options}>
            <AppText style={styles.text}>Logout</AppText>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={onAbout} style={styles.options}>
            <AppText style={styles.text}>About the App</AppText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  container: {
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: colors.white,
    marginLeft: 10,
    marginTop: 60,
    width: "40%",
  },
  options: {
    alignItems: "center",
    width: "100%",
  },
  separator: {
    backgroundColor: colors.black,
    height: 1,
    width: "100%",
  },
  text: {
    color: colors.black,
    fontSize: 22,
    padding: 5,
  },
});

export default AppMenuModal;
