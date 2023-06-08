import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

function CourtTable({ headers, rowData, onCellPress }) {
  return (
    <View>
      {headers.map((header, rowData, onCellPress) => {
        return (
          <View key={header}>
            <Text>{header}</Text>
            {rowData.map((row, rowIndex) => {
              return (
                <TouchableOpacity
                  key={row[colIndex]}
                  onPress={() => onCellPress(rowIndex, colIndex)}
                >
                  <Text>{row[colIndex]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CourtTable;
