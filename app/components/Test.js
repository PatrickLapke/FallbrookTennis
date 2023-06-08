import React, { useEffect, useState } from "react";
import { View, Text, Touchable } from "react-native";
import axios from "axios";
import { Row, Rows, Table } from "react-native-table-component";

const timeSlots = [
  "7:00-8:30",
  "8:30-10",
  "10:00-11:30",
  "11:30-1:00",
  "1:00-2:30",
  "2:30-4:00",
  "4:00-5:30",
  "5:30-7:00",
];

const CourtsList = () => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    fetchDays();
  }, []);

  const fetchDays = async () => {
    try {
      const response = await axios.get("");
      setDays(response.data);
    } catch (error) {
      console.log("Error fetching courts:", error);
    }
  };

  return (
    <View>
      {courts.map((court, courtIndex) => {
        return (
          <View key={court._id}>
            <Text>Court ID: {court.courtId}</Text>
            {court.bookings.map((booking, bookingIndex) => {
              const cellStyle = booking.isBooked
                ? styles.bookedCell
                : styles.availableCell;

              return (
                <TouchableOpacity
                  key={booking._id}
                  style={cellStyle}
                  onPress={() => onCellPress(courtIndex, bookingIndex)}
                >
                  <Text>{booking.timeSlot}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = {
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  timeSlotText: {
    fontSize: 14,
    textAlign: "center",
  },
};

export default CourtsList;
