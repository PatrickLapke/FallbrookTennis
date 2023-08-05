import { utcToZonedTime } from "date-fns-tz";

const CALIFORNIA_TIMEZONE = "America/Los_Angeles";

const createFixedTimeDate = (hours, minutes = 0) => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return utcToZonedTime(date, CALIFORNIA_TIMEZONE);
};

export const times = [
  {
    label: "7:00 AM",
    value: createFixedTimeDate(7, 0),
  },
  {
    label: "7:30 AM",
    value: createFixedTimeDate(7, 30),
  },
  {
    label: "8:00 AM",
    value: createFixedTimeDate(8, 0),
  },
  {
    label: "8:30 AM",
    value: createFixedTimeDate(8, 30),
  },
  {
    label: "9:00 AM",
    value: createFixedTimeDate(9, 0),
  },
  {
    label: "9:30 AM",
    value: createFixedTimeDate(9, 30),
  },
  {
    label: "10:00 AM",
    value: createFixedTimeDate(10, 0),
  },
  {
    label: "10:30 AM",
    value: createFixedTimeDate(10, 30),
  },
  {
    label: "11:00 AM",
    value: createFixedTimeDate(11, 0),
  },
  {
    label: "11:30 AM",
    value: createFixedTimeDate(11, 30),
  },
  {
    label: "12:00 PM",
    value: createFixedTimeDate(12, 0),
  },
  {
    label: "12:30 PM",
    value: createFixedTimeDate(12, 30),
  },
  {
    label: "1:00 PM",
    value: createFixedTimeDate(13, 0),
  },
  {
    label: "1:30 PM",
    value: createFixedTimeDate(13, 30),
  },
  {
    label: "2:00 PM",
    value: createFixedTimeDate(14, 0),
  },
  {
    label: "2:30 PM",
    value: createFixedTimeDate(14, 30),
  },
  {
    label: "3:00 PM",
    value: createFixedTimeDate(15, 0),
  },
  {
    label: "3:30 PM",
    value: createFixedTimeDate(15, 30),
  },
  {
    label: "4:00 PM",
    value: createFixedTimeDate(16, 0),
  },
  {
    label: "4:30 PM",
    value: createFixedTimeDate(16, 30),
  },
  {
    label: "5:00 PM",
    value: createFixedTimeDate(17, 0),
  },
  {
    label: "5:30 PM",
    value: createFixedTimeDate(17, 30),
  },
  {
    label: "6:00 PM",
    value: createFixedTimeDate(18, 0),
  },
  {
    label: "6:30 PM",
    value: createFixedTimeDate(18, 30),
  },
  {
    label: "7:00 PM",
    value: createFixedTimeDate(19, 0),
  },
];
