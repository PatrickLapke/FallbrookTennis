import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppButton from "./AppButton";

import Screen from "./Screen";
import colors from "../config/colors";

function Toggle(props) {
  const [isSingles, setIsSingles] = useState(null);
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.container}>
          {isSingles === true && (
            <AppButton
              width="40%"
              color="primary"
              title={"Singles"}
              onPress={() => setIsSingles(true)}
            />
          )}
          {isSingles !== true && (
            <AppButton
              width="40%"
              color="light"
              title={"Singles"}
              onPress={() => setIsSingles(true)}
            />
          )}
          {isSingles === false && (
            <AppButton
              width="40%"
              color="primary"
              title={"Doubles"}
              onPress={() => setIsSingles(false)}
            />
          )}
          {isSingles !== false && (
            <AppButton
              width="40%"
              color="light"
              title={"Doubles"}
              onPress={() => setIsSingles(false)}
            />
          )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-around" },
  selected: { backgroundColor: colors.primary },
});

export default Toggle;
