import React, { useState } from "react";
import { View, StyleSheet, Modal, Button, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import AppText from "./AppText";
import Screen from "./Screen";
import PickerItem from "./PickerItem";
import colors from "../config/colors";

function AppPicker({
  icon,
  items,
  placeholder,
  width = "100%",
  selectedItem,
  onSelectItem,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          testID="icon"
          name={icon}
          size={25}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <AppText style={styles.text}>
        {selectedItem ? selectedItem.label : placeholder}
      </AppText>
      <MaterialCommunityIcons
        testID="dropdown-icon"
        name="chevron-down"
        size={25}
        color={defaultStyles.colors.medium}
        onPress={() => setModalVisible(true)}
      />
      <Modal testID="modal" visible={modalVisible} animationType="slide">
        <Screen>
          <Button
            testID="close"
            title="close"
            onPress={() => setModalVisible(false)}
            color={colors.primary}
          ></Button>
          <FlatList
            data={items}
            keyExtractor={(item) => item.label}
            renderItem={({ item }) => (
              <PickerItem
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    marginVertical: 10,
    padding: 15,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
});

export default AppPicker;
