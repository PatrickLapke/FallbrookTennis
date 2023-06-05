import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";

const CourtsList = () => {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const response = await axios.get("http://192.168.0.16:3000/courts");
      setCourts(response.data);
    } catch (error) {
      console.log("Error fetching courts:", error);
    }
  };

  return (
    <View>
      <Text>List of Courts:</Text>
      {courts.map((court) => (
        <Text key={court._id}>{court.isBooked.toString()}</Text>
      ))}
    </View>
  );
};

export default CourtsList;
