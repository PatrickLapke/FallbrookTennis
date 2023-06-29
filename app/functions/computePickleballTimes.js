import { addHours, parse, setHours, setMinutes } from "date-fns";

export const computePickleballTimes = (selectedDate, time, selectedHours) => {
  try {
    let date = parse(selectedDate, "MM/dd", new Date());
    let startTime = setHours(
      setMinutes(date, time.value.getUTCMinutes()),
      time.value.getUTCHours()
    );
    let startTimeCopy = new Date(startTime.getTime());
    const endTime = addHours(startTimeCopy, selectedHours);

    return { startTime, endTime };
  } catch (error) {
    console.log(error);
  }
};
