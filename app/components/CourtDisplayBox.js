import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import axios from "axios";

function CourtDisplayBox() {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const response = await axios.get("");
      setCourts(response.data);
    } catch (error) {
      console.log("Error fetching courts:", error);
    }
  };

  return (
    <View style={styles.container}>
      {courts.map((court) => (
        <Text key={court._id}>Court {court.courtId}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CourtDisplayBox;
