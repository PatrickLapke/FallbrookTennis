import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function AppDisplayBox({ marginTop = 0, marginBottom = 0, children, header }) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={[
          styles.container,
          { marginTop: marginTop, marginBottom: marginBottom },
        ]}
      >
        {header && (
          <View style={styles.headerContainer}>
            <AppText style={styles.header}>{header}</AppText>
          </View>
        )}

        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flex: 1,
    overflow: "hidden",
    padding: 1,
  },
  header: { fontSize: 24 },
  headerContainer: {
    alignItems: "center",
    marginBottom: 7,
    marginTop: 5,
  },
});

export default AppDisplayBox;
