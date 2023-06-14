import { setHours, setMinutes, startOfTomorrow } from "date-fns";

const createFixedTimeDate = (hours, minutes = 0) => {
  return setMinutes(setHours(startOfTomorrow(), hours), minutes);
};

export const times = [
  {
    label: "7:00 AM",
    value: createFixedTimeDate(7, 0), // 7:00 AM
  },
  {
    label: "7:30 AM",
    value: createFixedTimeDate(7, 30), // 7:30 AM
  },
  {
    label: "8:00 AM",
    value: createFixedTimeDate(8, 0), // 8:00 AM
  },
  {
    label: "8:30 AM",
    value: createFixedTimeDate(8, 30), // 8:30 AM
  },
  {
    label: "9:00 AM",
    value: createFixedTimeDate(9, 0), // 9:00 AM
  },
  {
    label: "9:30 AM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "10:00 AM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "10:30 AM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "11:00 AM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "11:30 AM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "12:00 PM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "12:30 PM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "1:00 PM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "1:30 PM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "2:00 PM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "2:30 PM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "3:00 PM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "3:30 PM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "4:00 PM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "4:30 PM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "5:00 PM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "6:00 PM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "6:30 PM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
  {
    label: "7:00 PM",
    value: createFixedTimeDate(9, 30), // 9:30 AM
  },
];
